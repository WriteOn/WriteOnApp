/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-05-17
* Time: 09:40 PM
* To change this template use Tools | Templates.
*/

module.exports = function(app, auth0, jwt) {

// var jwt = require('express-jwt');

  var jwtCheck = jwt({
    secret: new Buffer('WTZUqWIyEvHxvBaWj50pZIZFIPIvcBCzhnYBlACMfZWilCXSgrwHGj20V-7HGyft', 'base64'),
    audience: 'p5xvPZdGVcK0ftTqBO5hcsirangc5dt8'
  });
	
};