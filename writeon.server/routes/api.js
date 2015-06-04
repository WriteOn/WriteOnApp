/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-06-04
* Time: 01:18 AM
* To change this template use Tools | Templates.
*/
module.exports = function(app) {

    app.get('/api/dropbox/oauth/receiver', function(req, res, next) {
        res.renderDebug('api/dropbox-oauth-receiver.html');
    });
     app.get('/api/gdrive/action', function(req, res, next) {
        res.renderDebug('api/gdrive-action.html');
    });
     app.get('/api/github/oauth/client', function(req, res, next) {
        res.renderDebug('api/github-oauth-client.html');
    });
     app.get('/api/tumblr/oauth/client', function(req, res, next) {
        res.renderDebug('api/tumblr-oauth-client.html');
    });
     app.get('/api/wordpress/oauth/client', function(req, res, next) {
        res.renderDebug('api/wordpress-oauth-client.html');
    });
};