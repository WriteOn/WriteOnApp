/* Begin : Try and run as a service called bootmywriteon */
exports.bootmywriteon = function(req, res) {

	//var mywriteonserver = req.param('mywriteonserver');
    var mywriteonserver = 'https://writeon.couchappy.com';
    var mywriteondb = req.param('mywriteondb');
    var mywriteonurl = mywriteonserver + '/' + mywriteondb;
	if(!mywriteondb) {
		res.status(400).send('Whoops, seems to be no My.WriteOn DB parameter. If you are trying to create an account, please try again. Server: ' + mywriteonserver + ' | DB: ' + mywriteondb);
	}
    else if(mywriteonurl.indexOf("http://") === 0 || mywriteonurl.indexOf("https://") === 0) {
    
/* Begin the My.WriteOn Setup Process */   
var validate = function(newDoc) {
	Object.keys(newDoc).forEach(function(key) {
		if(key[0] !== '_' && [
			'updated',
			'tags',
			'title'
		].indexOf(key) === -1) {
			throw({forbidden: 'Unknown document attribute: ' + key});
		}
	});
	var toString = Object.prototype.toString;
	if(toString.call(newDoc._id) !== '[object String]') {
		throw({forbidden: 'ID must be a string.'});
	}
	if(!newDoc._id.match(/[a-zA-Z0-9]{24}/)) {
		throw({forbidden: 'Invalid ID format.'});
	}
	if(newDoc._deleted) {
		if(newDoc.updated !== undefined ||
			newDoc.tags !== undefined ||
			newDoc.title !== undefined ||
			newDoc._attachments !== undefined) {
			throw({forbidden: 'Deleted document must be empty.'});
		}
		return;
	}
	if(toString.call(newDoc.updated) !== '[object Number]') {
		throw({forbidden: 'Update time must be an integer.'});
	}
	if(newDoc.updated > Date.now() + 300000) {
		throw({forbidden: 'Update time is in the future, please check your clock!'});
	}
	if(toString.call(newDoc.title) !== '[object String]') {
		throw({forbidden: 'Title must be a string.'});
	}
	if(!newDoc.title) {
		throw({forbidden: 'Title is empty.'});
	}
	if(newDoc.title.length >= 256) {
		throw({forbidden: 'Title too long.'});
	}
	if(newDoc.tags !== undefined) {
		if(toString.call(newDoc.tags) !== '[object Array]') {
			throw({forbidden: 'Tags must be an array.'});
		}
		if(newDoc.tags.length >= 16) {
			throw({forbidden: 'Too many tags.'});
		}
		newDoc.tags.forEach(function(tag) {
			if(toString.call(tag) !== '[object String]') {
				throw({forbidden: 'Tags must contain strings only.'});
			}
			if(!tag) {
				throw({forbidden: 'Tag is empty.'});
			}
			if(tag.length > 32) {
				throw({forbidden: 'Tag is too long.'});
			}
		});
	}
	var attachment = (newDoc._attachments || {}).content;
	if(!attachment) {
		throw({forbidden: 'Missing attached content.'});
	}
	if(attachment.content_type != 'text/plain') {
		throw({forbidden: 'Invalid content type.'});
	}
	if(Object.keys(newDoc._attachments).length > 1) {
		throw({forbidden: 'Too many attachments.'});
	}
};

var byUpdate = function(doc) {
	if(!doc.tags || !doc.tags.length) {
		this.emit(doc.updated, null);
	}
};

var byTagAndUpdate = function(doc) {
	doc.tags && doc.tags.forEach(function(tag) {
		this.emit([
			tag,
			doc.updated
		], null);
	});
};

var ddocs = [
	{
		path: '/_design/validate',
		body: {
			validate_doc_update: validate.toString()
		}
	},
	{
		path: '/_design/by_update',
		body: {
			views: {
				default: {
					map: byUpdate.toString()
				}
			}
		}
	},
	{
		path: '/_design/by_tag_and_update',
		body: {
			views: {
				default: {
					map: byTagAndUpdate.toString()
				}
			}
		}
	}
];

/* Since we are running as a service that gets called while creating an account, lets disable the node argv method         

if(process.argv.length < 3) {
	console.error('Missing URL parameter');
	process.exit(-1);
}

var url = require('url').parse(process.argv[2]);

*/
        
var url = mywriteonurl;
var request = require(url.protocol === 'https:' ? 'https' : 'http').request;
var onError;
var uploadDdoc;
        
onError = function onError(err, body) {
	console.error(err);
	body && console.error(body);
	process.exit(1);
};

uploadDdoc = function uploadDdoc() {
	if(ddocs.length === 0) {
		return console.log('All design documents updated successfully.');
	}
	var ddoc = ddocs.shift();
	var options = {
		hostname: url.hostname,
		port: url.port,
		path: url.path + ddoc.path,
		auth: url.auth,
		method: 'GET'
	};
	request(options, function(res) {
		var body = '';
		res
			.on('data', function(chunk) {
				body += chunk;
			})
			.on('end', function() {
				if(res.statusCode == 200) {
					ddoc.body._rev = JSON.parse(body)._rev;
				}
				var options = {
					hostname: url.hostname,
					port: url.port,
					path: url.path + ddoc.path,
					auth: url.auth,
					method: 'PUT',
					headers: {
						'Content-type': 'application/json'
					}
				};
				request(options, function(res) {
					var body = '';
					res
						.on('data', function(chunk) {
							body += chunk;
						})
						.on('end', function() {
							res.statusCode >= 300 && onError('Status code: ' + res.statusCode, body);
							uploadDdoc();
						});
				})
					.on('error', onError)
					.end(JSON.stringify(ddoc.body));
			});
	})
		.on('error', onError)
		.end();
};
uploadDdoc();

/* End if(!clouddb) */
}
/* End : Try and run as a service */
};