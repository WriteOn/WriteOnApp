var express = require('express');
var stormpath = require('express-stormpath');
var app = express();
var compression = require('compression');
var serveStatic = require('serve-static');
var extend = require('xtend');

// DEBUGGING HEADER ISSUES 
// this was supposed to fix it, but it hasn't yet
//app.disable('etag');

/* It's not quite Project Metosis, but this is going to allow us to 
 * serve meta pages (static resources) that are isolated from the core application middleware
 * and all of its dependencies. We also serve the web static pages that are pulling
 * in the app for loading and download in the browser [(]via serverStatic() below]
 * 
*/ 
app.set('views', __dirname + '/../views');

// Configure expressjs (ejs) engine, for it will be #awesome for us.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// Force HTTPS on writeon.io for really obvious reasons
app.all('*', function(req, res, next) {
	if (req.headers.host == 'writeon.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://writeon.io' + req.url);
	}
	if (req.headers.host == 'beta.writeon.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://beta.writeon.io' + req.url);
	}
	/\.(eot|ttf|woff|svg)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
	next();
});

// Use gzip compression
app.use(compression());

//connect some custom POST middleware
app.post('/bootmywriteon', require('./bootmywriteon').bootmywriteon);
app.post('/pdfExport', require('./pdf').export);
app.post('/sshPublish', require('./ssh').publish);
app.post('/picasaImportImg', require('./picasa').importImg);
app.get('/downloadImport', require('./download').importPublic);

/* 
 * Load Pad & Paper statically, as new middleware function to serve files from within specified directory
 * This allows us to operate Pad & Paper as thin browser clients with no dependency on server middleware
*/ 
app.use(serveStatic(__dirname + '/../public'));

/* This is to allow Bleeding Edge changes to be seen from the active
 * node.js server that is serving us.
*/ 
app.use(function(req, res, next) {
	res.renderDebug = function(page) {
		return res.render(page, {
			cache: !req.query.hasOwnProperty('debug')
		});
	};
	next();
});

// get us some auth middleware loaded up...docs via stormpath.com
//app.set('view engine', 'jade');
app.use(stormpath.init(app, {
    // apiKeyFile: __dirname + '/../app/auth/apiKey.properties',
	apiKeyId: '69ZDB6J0NHEE4LEBI81KPQP76',
	apiKeySecret: 'oGibdMjhQn+nKRXICQEmldp+CKydCj5Q+fLslVWm7jM',
    application: 'https://api.stormpath.com/v1/applications/4SgKKI7uk6OY7vbVt8uW4c',
    secretKey: 'mgUkj8P4eFt8Gxo9B9&X4Ih9d0w#NWAlZU&vQ88RqmysRz0lC6',
    googleAnalyticsID: 'UA-56730909-3',
    enableFacebook: true,
    enableGoogle: true,
    social: {
      facebook: {
        // store these credentials in environment variables. Please don’t hard code secret credentials into our source code!
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET
      },
      google: {
        // store these credentials in environment variables. Please don’t hard code secret credentials into our source code!
        clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }
    },
    //sessionDomain: 'writeon.io', // Make the session cookie work on all writeon.io subdomains.
    cache: 'memory',
    /*
    cache: 'memcached',
	cacheHost: 'pub-memcache-15782.us-east-1-2.3.ec2.garantiadata.com',
	cachePort: 15782,
	cacheOptions: {
    	auth_pass: 'mvs2vcn82lddrNx1',
		auth_user: 'memcached-app31087987'
	},
	*/ 
	//enableHttps: true,
    loginUrl: '/',
    redirectUrl: '/pad',
    enableAutoLogin: true,
    enableForgotPassword: true,
    enableAccountVerification: true,
    enableUsername: false,
    requireUsername: false,
    sessionDuration: 1000 * 60 * 120, // Make sessions expire after 120 minutes.
    registrationView: __dirname + '/../views/auth/register.jade',
    loginView: __dirname + '/../views/auth/login.jade',
    forgotPasswordView: __dirname + '/../views/auth/forgot.jade',
    forgotPasswordEmailSentView: __dirname + '/../views/auth/forgot_email_sent.jade',
    forgotPasswordChangeView: __dirname + '/../views/auth/forgot_change.jade',
    forgotPasswordChangeFailedView: __dirname + '/../views/auth/forgot_change_failed.jade',
    forgotPasswordCompleteView: __dirname + '/../views/auth/forgot_complete.jade',
    accountVerificationEmailSentView: __dirname + '/../views/auth/verification_email_sent.jade',
    accountVerificationCompleteView: __dirname + '/../views/auth/verification_complete.jade',
    accountVerificationFailedView: __dirname + '/../views/auth/verification_failed.jade',
    idSiteVerificationFailedView: __dirname + '/../views/auth/id_site_verification_failed.jade',
    googleLoginFailedView: __dirname + '/../views/auth/google_login_failed.jade',
    facebookLoginFailedView: __dirname + '/../views/auth/facebook_login_failed.jade',
    unauthorizedView: __dirname + '/../views/auth/unauthorized.jade'
}));


/* KISS. A keep it simple routing scheme here... forever. This app is intended to
 * be a single page app with meta pages, both of which we can assign routes for.
*/ 

// Serve recovery.html in /
app.get('/recovery', function(req, res) {
	res.renderDebug('recovery.html');
});
// Redirects
app.get('/login', function(req, res) {
    res.redirect('/');
});
app.get('/signup', function(req, res) {
    res.redirect('/register');
});
app.get('/signin', function(req, res) {
    res.redirect('/login');
});
app.get('/x6ywhf', function(req, res) {
    res.redirect('/pad');
});
app.get('/viewer', function(req, res) {
    res.redirect('/paper');
});

/* **********************
 * Variant Landing Pages
 * **********************
*/ 

// Serve landing.html
app.get('/landing', function(req, res) {
	res.renderDebug('landing.html');
});
// Serve landing-pages/200-authors-a.html
app.get('/authors', function(req, res) {
	res.renderDebug('landing-pages/200-author-a.html');
});
// Serve landing-pages/200-travel-a.html
app.get('/travel-writers', function(req, res) {
	res.renderDebug('landing-pages/200-travel-a.html');
});


// Serve editor.html in /pad
// Let's also lock this down with stormpath, by directory groups
//app.get('/pad', stormpath.groupsRequired(['Tier 1', 'Tier 2', 'Admin', 'Beta'], false), function(req, res) {
app.get('/pad', stormpath.loginRequired, function(req, res) {
    res.renderDebug('editor.html'), extend({
    givenName: req.user.givenName,
    surname: req.user.surname,
    username: req.user.username
  });
});

// Serve viewer.html in /paper
app.get('/paper', function(req, res) {
    res.renderDebug('viewer.html');
});


/* Let's get some custom error middleware built, starting with  the most common - 404 */

app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('That is not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('This is not too good, keyboard cat! Some major error just happened, but our developers have been notified.'));
});

// Error handlers

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

app.use(function(req, res){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('error_404.html');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.use(function(req, res){
  res.status(403);

  // respond with html page
  if (req.accepts('html')) {
    res.render('error_404.html');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.
/* jshint ignore:start */
app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  //res.render('error_500.html', { error: err });
  console.log({ error: err });
  return;
});
/* jshint ignore:end */


module.exports = app;
