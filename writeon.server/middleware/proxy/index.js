/* 
 * PROXY SERVERS. A keep it simple proxy middlware stack... forever.
 */

module.exports = function(app, req, res) {
	
	/*
	// Load config defaults from JSON file.
    // Environment variables override defaults.
    function loadConfig() {
        var config = JSON.parse(fs.readFileSync(__dirname + '/config.___.json', 'utf-8'));
        for(var i in config) {
            config[i] = process.env[i.toUpperCase()] || config[i];
        }
        console.log('Configuration');
        console.log(config);
        return config;
    }
    var config = loadConfig();
    //app.use(express.bodyParser());
	*/

// Load Proxy Middleware ======================================================================

	// Set up and load the Tumblr API proxy server middleware
	require('./tumblr.js')(app, req, res);
	
	
};