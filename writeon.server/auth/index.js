/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-05-17
* Time: 09:40 PM
* To change this template use Tools | Templates.
*/

module.exports = function(app) {

// Global Auth stretegies here	
	
// Set up the Stormpath application
require('./stormpath.js')(app);
	
};