module.exports = function(app) {
	
var oauth2 = require('oauth').OAuth2,
	fs = require('fs'),
	https = require('https'),
	bodyParser = require('body-parser');
	
    // Load config defaults from JSON file.
    // Environment variables override defaults.

    function loadConfig() {
        var config = JSON.parse(fs.readFileSync(__dirname + '/config/wordpress.json', 'utf-8'));
        for(var i in config) {
            config[i] = process.env[i.toUpperCase()] || config[i];
        }
        console.log('Wordpress API Configuration');
        console.log(config);
        return config;
    }
    var config = loadConfig();
    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	
    function createOauthObject() {
        return new oauth2(config.oauth_client_id, config.oauth_client_secret, config.oauth_base_site, config.oauth_authorize_path, config.oauth_access_token_path);
    }
    app.get('/api/wordpress/auth/:code', function(req, res) {
        console.log('Authenticating WP code:' + req.params.code);
        var oa = new createOauthObject();
        oa.getOAuthAccessToken(req.params.code, {
            'redirect_uri': config.redirect_uri,
            'grant_type': 'authorization_code'
        }, function(error, access_token, refresh_token, results) {
            if(error) {
                console.log("Error: " + JSON.stringify(error));
                res.json({
                    error: error
                });
                return;
            }
            //console.log("OAuth token: " + access_token);
            // Send OAuth token back to the client
            res.json({
                token: access_token
            });
        });
    });
    app.post('/api/wordpress/post', function(req, res) {
        console.log("/api/wordpress/post");
        //var oa = new createOauthObject();
        var data = JSON.stringify({
            tags: req.body.tags,
            status: req.body.status,
            date: req.body.date,
            title: req.body.title,
            content: req.body.content
        });
        var post_options = {
            host: 'public-api.wordpress.com',
            path: "/rest/v1/sites/" + req.body.site + "/posts/" + (req.body.postId || "new") + "?http_envelope=true",
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + req.body.token,
                "Content-Type": "application/json",
            }
        };
        // Set up the request
        var post_req = https.request(post_options, function(response) {
            response.pipe(res);
        });
        // post the data
        post_req.write(data);
        post_req.end();
    });

};