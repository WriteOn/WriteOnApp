var express = require('express');
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
app.get('/x6ywhf', function(req, res) {
	res.renderDebug('editor.html');
});

// Serve viewer.html in /viewer
app.get('/viewer', function(req, res) {
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
