var express = require('express');
var app = express();
var compression = require('compression');
var serveStatic = require('serve-static');

// Configure expressjs (ejs) engine
app.set('views', __dirname + '/../views');
app.engine('html', require('ejs').renderFile);

// Force HTTPS on writeon.io
app.all('*', function(req, res, next) {
	if (req.headers.host == 'writeon.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://writeon.io' + req.url);
	}
	/\.(eot|ttf|woff|svg)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
	next();
});

// Use gzip compression
app.use(compression());

app.post('/pdfExport', require('./pdf').export);
app.post('/sshPublish', require('./ssh').publish);
app.post('/picasaImportImg', require('./picasa').importImg);
app.get('/downloadImport', require('./download').importPublic);

// Serve static resources
app.use(serveStatic(__dirname + '/../public'));

app.use(function(req, res, next) {
	res.renderDebug = function(page) {
		return res.render(page, {
			cache: !req.query.hasOwnProperty('debug')
		});
	};
	next();
});

// Serve landing.html in /
app.get('/', function(req, res) {
	res.renderDebug('landing.html');
});

// Serve signup.html in /
app.get('/signup', function(req, res) {
	res.renderDebug('signup.html');
});

// Serve signin.html in /
app.get('/signin', function(req, res) {
	res.renderDebug('signin.html');
});

// Serve editor.html in /editor
app.get('/editor', function(req, res) {
	res.renderDebug('editor.html');
});

// Serve viewer.html in /viewer
app.get('/viewer', function(req, res) {
	res.renderDebug('viewer.html');
});

// Error 404
app.use(function(req, res) {
	res.status(404);
	res.render('error_404.html');
});

module.exports = app;
