
exports.export = function(req, res, next) {

var fs = require('fs');
var path = require('path');
var os = require('os');
var request = require('request');
var blockspring = require("blockspring");
	
	
	function onError(err) {
		next(err);
	}
	function onUnknownError() {
		res.statusCode = 400;
		res.end('Unknown error');
	}
	function onUnauthorizedError() {
		res.statusCode = 401;
		res.end('Unauthorized');
	}
	function onTimeout() {
		res.statusCode = 408;
		res.end('Request timeout');
	}
	
	var options, params = [];
	try {
		options = JSON.parse(req.query.options);
	}
	catch(e) {
		options = {};
	}

	blockspring.runParsed("html-to-pdf", { "html": res }, { api_key: "br_3660_99f88815862a0dd72ca378d04460ea283626663f"}, function(res) {
  		console.log(res.params);
	});
		
	
	
};

