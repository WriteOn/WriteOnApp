var express = require('express');
var stormpath = require('express-stormpath');
var app = express();
var compression = require('compression');
var serveStatic = require('serve-static');


// Configure expressjs (ejs) engine, for it will be #awesome for us.
app.set('views', __dirname + '/../views');
app.engine('html', require('ejs').renderFile);

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

/* It's not quite Project Metosis, but this is going to allow us to 
 * serve meta pages (static resources) that are isolated from the core application 
 * and all of its dependencies. We also serve the web static pages that are pulling
 * in the app for loading and download in the browser.
 * 
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
app.use(stormpath.init(app, {
    apiKeyFile: __dirname + '/../app/auth/apiKey.properties',
    application: 'https://api.stormpath.com/v1/applications/4SgKKI7uk6OY7vbVt8uW4c',
    secretKey: 'jK&kq xEyh>sO>n+pt7kO3y7DGR9@{6A$|z v6D$Mmff<FQ7zkJkn,L}&VK?gn,=',
    //sessionDomain: 'writeon.io', // Make the session cookie work on all writeon.io subdomains.
    //cache: 'memory',
    //enableHttps: true,
    googleAnalyticsID: 'UA-56730909-3',
    redirectUrl: '/x6ywhf',
    enableAutoLogin: true,
    enableForgotPassword: true,
    enableAccountVerification: false
}));


/* KISS. A keep it simple routing scheme here... forever. This app is intended to
 * be a single page app with meta pages, both of which we can assign routes for.
*/ 
// Serve landing.html in /
app.get('/', function(req, res) {
	res.renderDebug('landing.html');
});

// Serve signup.html in /signup
app.get('/signup', function(req, res) {
	res.renderDebug('signup.html');
});

// Serve signin.html in /singin
app.get('/signin', function(req, res) {
	res.renderDebug('signin.html');
});

// Serve editor.html in /editor
// ==== fedora - let's keep this randomized until we are public
// Let's also lock this down with stormpath, by directory groups
app.get('/x6ywhf', stormpath.groupsRequired(['Tier 1', 'Tier 2', 'Admin', 'Beta'], false), function(req, res) {
	res.renderDebug('editor.html');
});

// Serve viewer.html in /viewer
app.get('/viewer', stormpath.groupsRequired(['Tier 1', 'Tier 2', 'Admin', 'Beta'], false), function(req, res) {
	res.renderDebug('viewer.html');
});

/* Let's use custom error pages for the most common error codes with http */

// Error 404
app.use(function(req, res) {
	res.status(404);
	res.render('error_404.html');
});

// Error 403
app.use(function(req, res) {
	res.status(403);
	res.render('error_404.html');
});

// Error 401
app.use(function(req, res) {
	res.status(401);
	res.render('error_404.html');
});

// Error 500
app.use(function(req, res) {
	res.status(500);
	res.render('error_404.html');
});



module.exports = app;
