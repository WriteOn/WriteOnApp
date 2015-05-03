if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'WriteOn' // optional
  });
}
/* THIS IS COMMENTED OUT IN PROD< AND ONLY USED IN DEV */
require('nodetime').profile({
    accountKey: '6beee53d53766816b0f2a443cfc34fd6ab549325', 
    appName: 'WriteOn Dev'
  });
/**/

require('nodetime');
//require('newrelic');
var cluster = require('cluster');
var app = require('./app');

var count = require('os').cpus().length;

if(!process.env.NO_CLUSTER && cluster.isMaster) {
	for(var i = 0; i < count; i++) {
		cluster.fork();
	}
	cluster.on('exit', function() {
		console.log('Worker died. Spawning a new process...');
		cluster.fork();
	});
}
else {
	// Listen on port 3000
	var port = process.env.PORT || 3000;
	app.listen(port, null, function() {
		console.log('Server started: http://localhost:' + port);
	});
}

