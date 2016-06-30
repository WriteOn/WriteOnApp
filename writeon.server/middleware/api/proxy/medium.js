module.exports = function(app, req, res) {
	
var oauth2 = require('oauth').OAuth2,
	fs = require('fs'),
	https = require('https'),
	bodyParser = require('body-parser'),
	medium = require('medium-sdk'),
	configJson = '/config/medium.json',
	environment = 'prod';
	
		if(process.env.WRITEON_ENV) {
			environment = process.env.WRITEON_ENV;
		}
		if (environment == 'dev') {
			configJson = '/config/medium.dev.json';
		}
		else if (environment == 'next') {
			configJson = '/config/medium.next.json';
		}


    // Load config defaults from JSON file.
    // Environment variables override defaults.

    function loadConfig() {
        var config = JSON.parse(fs.readFileSync(__dirname + configJson, 'utf-8'));
        for(var i in config) {
            config[i] = process.env[i.toUpperCase()] || config[i];
        }
        console.log('Medium API Configured for ' + environment + '');
        //console.log(config);
        return config;
    }
    var config = loadConfig();
    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	
    function createOauthObject() {
        return new oauth2(config.oauth_client_id, config.oauth_client_secret, config.oauth_base_site, config.oauth_authorize_path, config.oauth_access_token_path);
    }
    
    app.get('/api/medium/auth/:code', function(req, res) {
        console.log('Authenticating Medium code:' + req.params.code);
        var oa = new createOauthObject();
        oa.getOAuthAccessToken(req.params.code, {
            'client_id': req.params.client_id,
            'client_secret': req.params.client_secret,
            'code': req.params.code,
            'state': req.params.state,
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
    app.post('/api/medium/post', function(req, res) {
        console.log("/api/medium/post");
        //var oa = new createOauthObject();
        var data = JSON.stringify({
            contentFormat: req.body.contentFormat,
            authorId: req.body.authorId,
            tags: req.body.tags,
            status: req.body.status,
            date: req.body.date,
            title: req.body.title,
            content: req.body.content,
            postId: req.body.postId,
            publishStatus: req.body.publishStatus,
            license: req.body.license
        });
        var post_options = {
            host: 'api.medium.com',
            path: "/v1/users/" + data.authorId + "/posts/" + (data.postId || "new") + "?http_envelope=true",
            authorId: req.body.authorId,
            tags: req.body.tags,
            status: req.body.status,
            date: req.body.date,
            title: data.title,
            contentFormat: data.contentFormat,
            canonicalUrl: data.canonicalUrl,
            publishStatus: data.publishStatus,
            license: data.license,
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


    // using medium-sdk
    app.post('/api/medium/publish', function(req, res) {
        console.log("/api/medium/publish");
        var token = req.body.token;
        var client = new medium.MediumClient({
            clientId: config.oauth_client_id,
            clientSecret: config.oauth_client_secret
        });
        
        var redirectURL = config.redirect_uri; 
        
        var url = client.getAuthorizationUrl('secretState', redirectURL, [
            medium.Scope.BASIC_PROFILE, medium.Scope.PUBLISH_POST, medium.Scope.listPublications, medium.Scope.uploadImage
        ]);

        var data = JSON.stringify({
            contentFormat: req.body.contentFormat,
            authorId: req.body.authorId,
            tags: req.body.tags,
            status: req.body.status,
            date: req.body.date,
            title: req.body.title,
            content: req.body.content,
            postId: req.body.postId,
            publishStatus: req.body.publishStatus,
            license: req.body.license
        });
        var post_options = {
            host: 'api.medium.com',
            path: "/v1/users/" + data.authorId + "/posts/" + (data.postId || "new") + "?http_envelope=true",
            authorId: req.body.authorId,
            tags: req.body.tags,
            status: req.body.status,
            date: req.body.date,
            title: data.title,
            contentFormat: data.contentFormat,
            canonicalUrl: data.canonicalUrl,
            publishStatus: data.publishStatus,
            license: data.license,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
            }
        };
        /* Set up the request
        var post_req = https.request(post_options, function(response) {
            response.pipe(res);
        });
        // post the data
        post_req.write(data);
        post_req.end();
        */
        
        
        client.exchangeAuthorizationCode(token, redirectURL, function (err, token) {
            client.getUser(function (err, user) {
                client.createPost({
                    userId: user.id,
                    title: data.title,
                    contentFormat: medium.PostContentFormat.HTML,
                    content: data.content,
                    publishStatus: medium.PostPublishStatus.DRAFT
                }, function (err, post) {
                    console.log(token, user, post);
                });
            });
        });
    });

};