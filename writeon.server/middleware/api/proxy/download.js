module.exports = function(app) {
	
    var followRedirect = require('follow-redirects'),
        fs = require('fs'),
        qs = require('querystring');
	
    // Load config defaults from JSON file.
    // Environment variables override defaults.

    function loadConfig() {
        var config = JSON.parse(fs.readFileSync(__dirname + '/config/download.json', 'utf-8'));
        for(var i in config) {
            config[i] = process.env[i.toUpperCase()] || config[i];
        }
        console.log('Download API Configured');
        // console.log(config);
        return config;
    }
    var config = loadConfig();

    app.get('/download', function(req, res) {
        console.log("/download");
        var url = req.param('url');
        if(!url) {
            res.send("No URL parameter", 500);
        } else if(url.indexOf("http://") === 0) {
            followRedirect.http.get(url, function(response) {
                response.pipe(res);
            });
        } else if(url.indexOf("https://") === 0) {
            followRedirect.https.get(url, function(response) {
                response.pipe(res);
            });
        } else {
            res.send("Hmmm... Unknown Protocol", 500);
        }
    });

};