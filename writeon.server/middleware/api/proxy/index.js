/* 
 * PROXY SERVERS. A keep it simple proxy middlware stack... forever.
 */

module.exports = function(app, req, res) {
	
    // Convenience for allowing CORS on Proxy / API routes - GET only
    app.all('/api/*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

// Load Proxy Middleware ======================================================================

	// Set up and load the Tumblr API proxy server middleware
	require('./tumblr.js')(app, req, res);

	// Set up and load the Wordpress API proxy server middleware
	require('./wordpress.js')(app, req, res);

	// Set up and load the Github Gatekeeper API proxy server middleware
	require('./github.js')(app, req, res);

	// Set up and load the DOwnload API proxy server middleware
	require('./download.js')(app, req, res);

};