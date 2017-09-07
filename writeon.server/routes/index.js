/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-05-17
* Time: 09:40 PM
* To change this template use Tools | Templates.
*/

module.exports = function(app) {

var extend = require('xtend');
	
/* 
 * KISS. A keep it simple routing scheme for core app functions and the API. Cannot use root /
*/ 

// Serve recovery.html in /
app.get('/recovery', function(req, res) {
	res.renderDebug('recovery.html');
});
app.get('/signup', function(req, res) {
    res.redirect('/register');
});
app.get('/signin', function(req, res) {
    res.redirect('/login');
});


// Serve pad.html in /pad
app.get('/pad', function(req, res) {
	res.renderDebug('pad.html');
});
	
// Serve pad-offline.html in /off
app.get('/off', function(req, res) {
	res.renderDebug('pad-offline.html');
});
app.get('/norequire', function(req, res) {
    res.renderDebug('norequire.html');
});
	
// Serve paper.html in /paper
app.get('/paper', function(req, res) {
    res.renderDebug('paper.html');
});
	
/* 
 * AUTH. This is vendor specific routing 
*/
// Route middleware to make sure a user is logged in
    /* jshint ignore:start */
	function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on 
        if(req.isAuthenticated()) return next();
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
	/* jshint ignore:end */
	

/* 
 * WEB ROUTES. This is writeon.io specific routing 
*/	
// Variant Static Pages -  includes fully configured static routes for landing pages
require('./variant')(app);

// Angular route middleware for writeon.io
require('./angular')(app);
	
	
};	