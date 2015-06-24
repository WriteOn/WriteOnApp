var express = require('express');
var session = require('express-session');
var stormpath = require('express-stormpath');
var app = express();
var compression = require('compression');
var serveStatic = require('serve-static');
//var extend = require('xtend');
var gzippo = require('gzippo');
var morgan = require('morgan');
/* 
 * DEBUGGING HEADER ISSUES.
 */
// This is supposed to help with certaink offlie browser issues
// app.disable('etag');
// 

/* 
 * FORCE HTTPS
 */
// Used to force SSL - required for security ==================================================
app.use('*', function(req, res, next) {
    if(req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://' + req.headers.host + req.path);
    } 
	/\.(eot|ttf|woff|svg|png)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
	return next();
});

/* Legacy support ... per domain 
app.use('*', function(req, res, next) {
	if (req.headers.host == 'writeon.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://writeon.io' + req.url);
	}
	if (req.headers.host == 'next.writeon.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://next.writeon.io' + req.url);
	}
	if (req.headers.host == 'beta.writeon.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://writeon.io' + req.url);
	}	
	if (req.headers.host == 'mammal-charter.codio.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://mammal-charter.codio.io:9501/testpassed' + req.url);
	}
	/\.(eot|ttf|woff|svg)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
	next();
});
*/

/* 
 * SESSION STORE. A keep it simple session store.
 * Helps us interact with the front end app
 *
 */
var sesh = {
  key: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
  secret: 'db198a85842c8edca076ba66f35d6022f2a4163c',
  resave: false,
  saveUninitialized: true,
  cookie: {}
};
var environment = process.env.WRITEON_ENV;

if (environment != 'dev') {
  app.set('trust proxy', 1); // trust first proxy
  sesh.cookie.secure = true; // serve secure cookies
}

app.use(session(sesh));


/* 
 * VIEW ENGINE. A keep it simple view-based http server.
 * Serve meta pages (static resources) that are isolated from the core application middleware
 * and all of its dependencies. We also serve the web static pages that are pulling
 * in the app for loading and download in the browser [(]via serverStatic() below]
 *
 */
app.set('views', __dirname + '/views');
// Configure view engine // Currently expressjs (ejs)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// Use gzip compression
app.use(compression());
/* Load the prerender engine for Angular - using prerender.io */
app.use(require('prerender-node').set('prerenderToken', 'Rkc1v2erHMhjziNu5gbC'));

/* This is to allow Bleeding Edge changes to be seen from the active
 * node.js server that is serving us. Just use ?=edge in any query string. Does not work
 * for any angular routes
 */
app.use(function(req, res, next) {
    res.renderDebug = function(page) {
        return res.render(page, {
            cache: !req.query.hasOwnProperty('edge')
        });
    };
    next();
});
/* 
 * MIDDLEWARE. A keep it simple middleware stack... forever.
 */
// Load Server Middlwware ======================================================================
// Set up and load the server middleware applications
require('./middleware')(app);
/* 
 * STATIC SERVER. A keep it simple middleware for offline apps & resources.
 * Load the assets for the offline app to fetch & retrieve files
 * This allows us to operate Pad & Paper as thin browser clients with no dependency on server middleware
 */
// Using ServeStatic
app.use(serveStatic(__dirname + '/../public'));
// Using G-Zippo (gzip)
app.use(gzippo.staticGzip(__dirname + '/../public'));
/* 
 * WEBSITE. A keep it simple marketing stack... forever.
 */
// Load Angular Marketing Site ======================================================================
// Set up and load any middleware and config for the front end website
//require('/writeon.io')(app);
/* 
 * AUTHORIZATION. A keep it simple Auth scheme... forever.
 */
// Load Server Auth ======================================================================
// Set up and load the Auth application
require('./auth')(app, stormpath);
/* 
 * APP ROUTES. A keep it simple routing scheme... forever.
 */
// Load Routes ======================================================================
// Server Routes - load our routes and pass in stormpath middlware
require('./routes')(app, stormpath);
/* 
 * ERROR HANDLING. A keep it simple error scheme... forever.
 */
// Load Error Routes ======================================================================
//require('./errors')(app);
//
/* 
 * 
 * LOGGING. A keep it simple HTTP request logger middleware...Morgan.
 */
// Load Request logger ======================================================================
app.use(morgan('app'));

module.exports = app;