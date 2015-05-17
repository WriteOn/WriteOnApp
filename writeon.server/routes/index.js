/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-05-17
* Time: 09:40 PM
* To change this template use Tools | Templates.
*/

module.exports = function(app, stormpath) {

	
/* KISS. A keep it simple routing scheme here... forever. This app is intended to
 * be a single page app with meta pages, both of which we can assign routes for.
*/ 

// Serve recovery.html in /
app.get('/recovery', function(req, res) {
	res.renderDebug('recovery.html');
});
// Redirects
app.get('/login', function(req, res) {
    res.redirect('/');
});
app.get('/signup', function(req, res) {
    res.redirect('/register');
});
app.get('/signin', function(req, res) {
    res.redirect('/login');
});
app.get('/x6ywhf', function(req, res) {
    res.redirect('/pad');
});
app.get('/viewer', function(req, res) {
    res.redirect('/paper');
});



// Serve editor.html in /pad
// Let's also lock this down with stormpath, by directory groups
//app.get('/pad', stormpath.groupsRequired(['Tier 1', 'Tier 2', 'Admin', 'Beta'], false), function(req, res) {
app.get('/pad', stormpath.loginRequired, function(req, res) {
    res.renderDebug('editor.html'), extend({
    givenName: req.user.givenName,
    surname: req.user.surname,
    username: req.user.username
  });
});

// Serve viewer.html in /paper
app.get('/paper', function(req, res) {
    res.renderDebug('viewer.html');
});

// route middleware to make sure a user is logged in

    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on 
        if(req.isAuthenticated()) return next();
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
	
};	