/* 
 * LOAD APPLICATION MONITORING.
 */
// Load Nodetime
if(process.env.NODETIME_ACCOUNT_KEY) {
    require('nodetime').profile({
        accountKey: process.env.NODETIME_ACCOUNT_KEY,
        appName: 'WriteOn' // optional
    });
}
/* THIS IS COMMENTED OUT IN PROD< AND ONLY USED IN DEV 
 * /
require('nodetime').profile({
    accountKey: '6beee53d53766816b0f2a443cfc34fd6ab549325', 
    appName: 'WriteOn Dev'
  });
/*/
require('nodetime');
require('newrelic');
/* 
 * LOAD SERVER DEPEDENCIES
 */
var cluster = require('cluster');
var no_cluster = 1;
/* 
 * LOAD APPLICATIONS
 */
var app = require('./writeon.server');

/* 
 * FORCE HTTPS
 */
/* Used to force SSL - required for security */
app.all('*', function(req, res, next) {
    if(req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://' + req.headers.host + req.path);
    } 
	/\.(eot|ttf|woff|svg|png)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
	next();
});
/* Legacy ...
app.all('*', function(req, res, next) {
	if (req.headers.host == 'writeon.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://writeon.io' + req.url);
	}
	if (req.headers.host == 'beta.writeon.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://beta.writeon.io' + req.url);
	}
	/\.(eot|ttf|woff|svg)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
	next();
});
*/
/* 
 * NODE CLUSTERING
 */
// To turn off clustering, set $ process.env.NO_CLUSTER=1 
if(!process.env.NO_CLUSTER && !no_cluster && cluster.isMaster) {
    // Count the machine's CPUs 
    var count = require('os').cpus().length;
    // Create a worker for each CPU
    for(var i = 0; i < count; i++) {
        cluster.fork();
    }
    cluster.on('exit', function() {
        console.log('Worker died. Spawning a new process...');
        cluster.fork();
    });
    cluster.on('fork', function(worker) {
        console.log('Worker ' + worker.id + ' is now running.');
    });
} else {
    // Listen on port 3000
    var port = process.env.PORT || 3000;
    app.listen(port, null, function() {
        console.log('Server started: http://localhost:' + port);
    });
}