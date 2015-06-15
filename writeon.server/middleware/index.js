/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-05-17
* Time: 09:41 PM
* To change this template use Tools | Templates.
*/

module.exports = function(app) {

	//connect some custom middleware
	app.post('/api/account/create', require('./bootmywriteon').bootmywriteon);
	app.post('/api/publish/pdf', require('./pdf').export);
	app.post('/api/publish/ssh', require('./ssh').publish);
	app.post('/api/google/import/images', require('./picasa').importImg);
	app.get('/api/import/local', require('./download').importPublic);
	
	//connect the API middleware
	require('./api')(app);
	
};