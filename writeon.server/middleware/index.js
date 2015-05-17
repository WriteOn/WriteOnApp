/**
* Created with WriteOn App.
* User: thinq4yourself
* Date: 2015-05-17
* Time: 09:41 PM
* To change this template use Tools | Templates.
*/

module.exports = function(app) {

	//connect some custom middleware
	app.post('/bootmywriteon', require('./middleware/bootmywriteon').bootmywriteon);
	app.post('/pdfExport', require('./middleware/pdf').export);
	app.post('/sshPublish', require('./middleware/ssh').publish);
	app.post('/picasaImportImg', require('./middleware/picasa').importImg);
	app.get('/downloadImport', require('./middleware/download').importPublic);
	
};