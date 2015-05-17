var express = require('express');
var stormpath = require('express-stormpath');
var app = express();
var compression = require('compression');
var serveStatic = require('serve-static');
var extend = require('xtend');

/* 
 * DEBUGGING HEADER ISSUES. 
*/
// This is supposed to help with certaink offlie browser issues
// app.disable('etag');

/* VIEW ENGINE. A keep it simple view-based http server.
 * Serve meta pages (static resources) that are isolated from the core application middleware
 * and all of its dependencies. We also serve the web static pages that are pulling
 * in the app for loading and download in the browser [(]via serverStatic() below]
 * 
*/ 
app.set('views', __dirname + './views');
// Configure view engine // Currently expressjs (ejs)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// Use gzip compression
app.use(compression());

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

/* 
 * AUTHORIZATION. A keep it simple Auth scheme... forever. 
*/

// Load Server Auth ======================================================================
// Set up and load the Auth application
require('./auth')(app);

/* 
 * APP ROUTES. A keep it simple routing scheme... forever. 
*/

// Load Routes ======================================================================
// Stormpath - load our routes and pass in our app with fully configured stormpath middlware
require('./routes')(app, stormpath);

/* 
 * ERROR HANDLING. A keep it simple error scheme... forever. 
*/

// Load Error Routes ======================================================================
require('./errors')(app);



module.exports = app;
