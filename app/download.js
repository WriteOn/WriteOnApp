var request = require('request');

exports.importPublic = function(req, res) {
	var url = req.param('url');
	if(!url) {
		res.send(400, 'Whoops, seems to be no URL parameter.');
	}
	else if(url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
		var stream = request.get(url);
		stream.on('error', function(err) {
			res.send(400, err);
		});
		stream.on('response', function() {
			stream.pipe(res);
		});
	}
	else {
		res.send(400, 'This is unknown <a href="https://en.wikipedia.org/wiki/Lists_of_network_protocols" target="_blank">protocol</a>.');
	}
};