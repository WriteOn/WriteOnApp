/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-05-17
* Time: 09:41 PM
* To change this template use Tools | Templates.
*/

module.exports = function(app) {

	//connect some custom middleware
	app.post('/bootmywriteon', require('./bootmywriteon').bootmywriteon);
	app.post('/pdfExport', require('./pdf').export);
	app.post('/sshPublish', require('./ssh').publish);
	app.post('/picasaImportImg', require('./picasa').importImg);
	app.get('/downloadImport', require('./download').importPublic);
	
	//connect the proxy API middleware
	require('./api/proxy')(app);
	
};