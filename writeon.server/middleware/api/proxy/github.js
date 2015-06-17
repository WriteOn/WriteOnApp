module.exports = function(app, req, res) {
	
    var url = require('url'),
        http = require('http'),
        https = require('https'),
        fs = require('fs'),
        qs = require('querystring'),
		configJson = '/config/github.json',
		environment = 'prod';
	
		if(process.env.ENV) {
			environment = process.env.ENV;
		}
		if (environment == 'dev') {
			configJson = '/config/github.dev.json';
		}
		else if (environment == 'next') {
			configJson = '/config/github.next.json';
		}

    // Load config defaults from JSON file.
    // Environment variables override defaults.

    function loadConfig() {
        var config = JSON.parse(fs.readFileSync(__dirname + configJson, 'utf-8'));
        for(var i in config) {
            config[i] = process.env[i.toUpperCase()] || config[i];
        }
        console.log('Github API Configured for ' + environment + '');
        //console.log(config);
        return config;
    }
    var config = loadConfig();

	// Github Gatekeeper, at your service. Based on https://github.com/prose/gatekeeper
    function authenticate(code, cb) {
        var data = qs.stringify({
            client_id: config.oauth_client_id,
            client_secret: config.oauth_client_secret,
            code: code
        });
        var reqOptions = {
            host: config.oauth_host,
            port: config.oauth_port,
            path: config.oauth_path,
            method: config.oauth_method,
            headers: {
                'content-length': data.length
            }
        };
        var body = "";
        var req = https.request(reqOptions, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                cb(null, qs.parse(body).access_token);
            });
        });
        req.write(data);
        req.end();
        req.on('error', function(e) {
            cb(e.message);
        });
    }
    app.get('/api/github/auth/:code', function(req, res) {
        console.log('Authenticating Github Code:' + req.params.code);
        authenticate(req.params.code, function(err, token) {
            var result = err || !token ? {
                "error": "bad_code"
            } : {
                "token": token
            };
            console.log(result);
            res.json(result);
        });
    });
    app.get('/api/github/lib', function(req, res, next) {
        res.sendFile('github.js', {
            root: './public/libs'
        });
    });
};