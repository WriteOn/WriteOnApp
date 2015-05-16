define([
	"jquery",
	"underscore",
	"core",
	"utils",
	"storage",
	"logger",
	"constants",
	"settings",
	"eventMgr",
	"classes/AsyncTask"
], function($, _, core, utils, storage, logger, constants, settings, eventMgr, AsyncTask) {

	var couchdbHelper = {};

	// Listen to offline status changes
	var isOffline = false;
	eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
		isOffline = isOfflineParam;
	});


/* 
 * ============================================================
 * 
 * BEGIN ---
 * 
 * THIS IS TEMPROARILY HERE TO TEST THE PROVISIONING SERVICE - 
 * ============================================================
 */    
    
	couchdbHelper.createmywriteondb = function(mywriteondb, callback) {
	// set the base couchdb server
    var mywriteonserver = settings.couchdbserver;
    var mywriteonauth = settings.couchdbauth;            //base64 encoded
    // var mywriteondb = utils.encodeBase64(mywriteondb);
    var result;
 
	    var task = new AsyncTask();
		task.onRun(function() {
        
        var xhr = new XMLHttpRequest();
				xhr.open('PUT', mywriteonserver + '/' + mywriteondb, true);
				xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Basic ' + mywriteonauth + ''); 
				xhr.onreadystatechange = function() {
					if(this.readyState == 4) {
						if(this.status == 201) {
                            console.log(this.response + "Your Instance '" + mywriteondb + "' was " + this.statusText);
                            result = "Your Instance '" + mywriteondb + "' was " + this.statusText;
                            task.chain();
						}
						else if(this.status == 412) {
                            console.log(this.response);
                            result = "An Instance with the name '" + mywriteondb + "' already exists";
                            handleError(result, task);
						}
						else {
							console.log("There was an error when trying to configure your new My.WriteOn instance: " + this.statusText);
                            handleError(this.statusText, task);
						}
					}
				};
				xhr.send();
		});
		task.onSuccess(function() {
			callback(undefined, result);
            // couchdbHelper.configuremywriteondb(mywriteondb);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue(); 

	}; // END: couchdbHelper.createmywriteondb
    
    
    
	couchdbHelper.configuremywriteondb = function(mywriteondb, callback) {
	//set the base couchdb server
    var mywriteonserver = settings.couchdbserver;
    var mywriteondesignurl = mywriteonserver + '/' + mywriteondb;
    var mywriteonauth = settings.couchdbauth;        //base64 encoded       
    var result;
 
	    var task = new AsyncTask();
		task.onRun(function() {
    
			//create the `validate` design doc
			$.ajax({
				type: 'PUT',
				url: mywriteondesignurl + '/_design/validate',
				headers: {
                    Authorization: 'Basic ' + mywriteonauth + '',
					Accept: 'application/json'
				},
                contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify({
					_id: "_design/validate",
					validate_doc_update: "function (newDoc) {\n\tObject.keys(newDoc).forEach(function(key) {\n\t\tif(key[0] !== '_' && [\n\t\t\t'updated',\n\t\t\t'tags',\n\t\t\t'title'\n\t\t].indexOf(key) === -1) {\n\t\t\tthrow({forbidden: 'Unknown document attribute: ' + key});\n\t\t}\n\t});\n\tvar toString = Object.prototype.toString;\n\tif(toString.call(newDoc._id) !== '[object String]') {\n\t\tthrow({forbidden: 'ID must be a string.'});\n\t}\n\tif(!newDoc._id.match(/[a-zA-Z0-9]{24}/)) {\n\t\tthrow({forbidden: 'Invalid ID format.'});\n\t}\n\tif(newDoc._deleted) {\n\t\tif(newDoc.updated !== undefined ||\n\t\t\tnewDoc.tags !== undefined ||\n\t\t\tnewDoc.title !== undefined ||\n\t\t\tnewDoc._attachments !== undefined) {\n\t\t\tthrow({forbidden: 'Deleted document must be empty.'});\n\t\t}\n\t\treturn;\n\t}\n\tif(toString.call(newDoc.updated) !== '[object Number]') {\n\t\tthrow({forbidden: 'Update time must be an integer.'});\n\t}\n\tif(newDoc.updated > Date.now() + 300000) {\n\t\tthrow({forbidden: 'Update time is in the future, please check your clock!'});\n\t}\n\tif(toString.call(newDoc.title) !== '[object String]') {\n\t\tthrow({forbidden: 'Title must be a string.'});\n\t}\n\tif(!newDoc.title) {\n\t\tthrow({forbidden: 'Title is empty.'});\n\t}\n\tif(newDoc.title.length >= 256) {\n\t\tthrow({forbidden: 'Title too long.'});\n\t}\n\tif(newDoc.tags !== undefined) {\n\t\tif(toString.call(newDoc.tags) !== '[object Array]') {\n\t\t\tthrow({forbidden: 'Tags must be an array.'});\n\t\t}\n\t\tif(newDoc.tags.length >= 16) {\n\t\t\tthrow({forbidden: 'Too many tags.'});\n\t\t}\n\t\tnewDoc.tags.forEach(function(tag) {\n\t\t\tif(toString.call(tag) !== '[object String]') {\n\t\t\t\tthrow({forbidden: 'Tags must contain strings only.'});\n\t\t\t}\n\t\t\tif(!tag) {\n\t\t\t\tthrow({forbidden: 'Tag is empty.'});\n\t\t\t}\n\t\t\tif(tag.length > 32) {\n\t\t\t\tthrow({forbidden: 'Tag is too long.'});\n\t\t\t}\n\t\t});\n\t}\n\tvar attachment = (newDoc._attachments || {}).content;\n\tif(!attachment) {\n\t\tthrow({forbidden: 'Missing attached content.'});\n\t}\n\tif(attachment.content_type != 'text/plain') {\n\t\tthrow({forbidden: 'Invalid content type.'});\n\t}\n\tif(Object.keys(newDoc._attachments).length > 1) {\n\t\tthrow({forbidden: 'Too many attachments.'});\n\t}\n}"
				})
			}).done(function(data) {
				result = data;
				task.chain();
			}).fail(function(jqXHR) {
				handleError(jqXHR, task);
            });    // end: create `validate` design doc        

            //create the `by_update` view
			$.ajax({
				type: 'PUT',
				url: mywriteondesignurl + '/_design/by_update',
				headers: {
                    Authorization: 'Basic ' + mywriteonauth + '',
					Accept: 'application/json'
				},
                contentType: 'application/json',
				data: JSON.stringify({
					_id: "_design/by_update",
					views: {
						default: {
							map: "function (doc) {\n\tif(!doc.tags || !doc.tags.length) {\n\t\temit(doc.updated, null);\n\t}\n}"
						}
					},
                    language: "javascript"
				})
			}).done(function(data) {
				result = data;
				task.chain();
			}).fail(function(jqXHR) {
				handleError(jqXHR, task);
			});    // end: create `by_update` view            

            //create the `by_tag_and_update` view
			$.ajax({
				type: 'PUT',
				url: mywriteondesignurl + '/_design/by_tag_and_update',
				headers: {
                    Authorization: 'Basic ' + mywriteonauth + '',
					Accept: 'application/json'
				},
                contentType: 'application/json',
				data: JSON.stringify({
					_id: "_design/by_tag_and_update",
					views: {
						default: {
							map: "function(doc) {\n\tdoc.tags && doc.tags.forEach(function(tag) {\n\t\temit([\n\t\t\ttag,\n\t\t\tdoc.updated\n\t\t], null);\n\t});\n}"
						}
					},
                    language : "javascript"
				})
			}).done(function(data) {
				result = data;
				task.chain();
			}).fail(function(jqXHR) {
				handleError(jqXHR, task);
			});    // end: create `by_tag_and_update` view            

            
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue(); 
            
            
	}; // END: couchdbHelper.setupmywriteondb
   
    
 /*
 * ============================================================
 * 
 * END ---
 * 
 * THIS IS TEMPROARILY HERE TO TEST THE PROVISIONING SERVICE - 
 * ============================================================
 */
 
        
	couchdbHelper.uploadDocument = function(documentId, title, content, tags, rev, callback) {
		var result;
		var task = new AsyncTask();
		task.onRun(function() {
			if(tags) {
				// Has to be an array
				if(!_.isArray(tags)) {
					tags = _.chain(('' + tags).split(/,/))
						.compact()
						.unique()
						.value();
				}
				// Remove invalid tags
				tags = tags.filter(function(tag) {
					return _.isString(tag) && tag.length < 32;
				});
				// Limit the number of tags
				tags = tags.slice(0, 16);
			}
			else {
				tags = undefined;
			}
			$.ajax({
				type: 'POST',
				url: settings.couchdbUrl,
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify({
					_id: documentId || utils.id(),
					title: title,
					tags: tags,
					updated: Date.now(),
					_rev: rev,
					_attachments: {
						content: {
							content_type: 'text\/plain',
							data: utils.encodeBase64(content)
						}
					}
				})
			}).done(function(data) {
				result = data;
				task.chain();
			}).fail(function(jqXHR) {
				handleError(jqXHR, task);
			});
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	couchdbHelper.checkChanges = function(lastChangeId, syncLocations, callback) {
		var changes;
		var newChangeId = lastChangeId || 0;
		var task = new AsyncTask();
		task.onRun(function() {
			$.ajax({
				type: 'POST',
				url: settings.couchdbUrl + '/_changes?' + $.param({
					filter: '_doc_ids',
					since: newChangeId,
					include_docs: true,
					attachments: true
				}),
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify({
					doc_ids: Object.keys(syncLocations)
				})
			}).done(function(data) {
				newChangeId = data.last_seq;
				changes = _.map(data.results, function(result) {
					return result.deleted ? {
						_id: result.id,
						deleted: true
					} : result.doc;
				});
				task.chain();
			}).fail(function(jqXHR) {
				handleError(jqXHR, task);
			});
		});
		task.onSuccess(function() {
			callback(undefined, changes, newChangeId);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	couchdbHelper.downloadContent = function(documents, callback) {
		var result = [];
		var task = new AsyncTask();
		task.onRun(function() {
			function recursiveDownloadContent() {
				if(documents.length === 0) {
					return task.chain();
				}
				var document = documents[0];
				result.push(document);
				if(document.deleted || ((document._attachments || {}).content || {}).data !== undefined) {
					documents.shift();
					return task.chain(recursiveDownloadContent);
				}
				$.ajax({
					url: settings.couchdbUrl + '/' + encodeURIComponent(document._id),
					headers: {
						Accept: 'application/json'
					},
					contentType: 'application/json',
					dataType: 'json',
					data: {
						attachments: true
					}
				}).done(function(doc) {
					documents.shift();
					_.extend(document, doc);
					task.chain(recursiveDownloadContent);
				}).fail(function(jqXHR) {
					handleError(jqXHR, task);
				});
			}

			task.chain(recursiveDownloadContent);
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	couchdbHelper.listDocuments = function(tag, updated, callback) {
		var result;
		var task = new AsyncTask();
		task.onRun(function() {
			var ddoc = '/_design/by_' + (tag ? 'tag_and_' : '') + 'update/_view/default';
			var startKey = tag ? JSON.stringify([
				tag,
				updated || []
			]) : updated;
			var endKey = tag ? JSON.stringify([
				tag
			]) : undefined;
			$.ajax({
				url: settings.couchdbUrl + ddoc,
				data: {
					start_key: startKey,
					end_key: endKey,
					descending: true,
					include_docs: true,
					limit: constants.COUCHDB_PAGE_SIZE,
					reduce: false
				},
				dataType: 'json'
			}).done(function(data) {
				result = _.pluck(data.rows, 'doc');
				task.chain();
			}).fail(function(jqXHR) {
				handleError(jqXHR, task);
			});
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	couchdbHelper.deleteDocuments = function(docs) {
		var task = new AsyncTask();
		task.onRun(function() {
			$.ajax({
				type: 'POST',
				url: settings.couchdbUrl + '/_bulk_docs',
				data: JSON.stringify({
					docs: docs.map(function(doc) {
						return {
							_id: doc._id,
							_rev: doc._rev,
							_deleted: true
						};
					})
				}),
				contentType: 'application/json',
				dataType: 'json'
			}).done(function() {
				task.chain();
			}).fail(function(jqXHR) {
				handleError(jqXHR, task);
			});
		});
		task.enqueue();
	};

	function handleError(jqXHR, task) {
		var error = {
			code: jqXHR.status,
			message: jqXHR.statusText,
			reason: (jqXHR.responseJSON || {}).reason
		};
		var errorMsg;
		if(error) {
			logger.error(error);
			// Try to analyze the error
			if(typeof error === "string") {
				errorMsg = error;
			}
			else {
				errorMsg = "Error " + error.code + ": " + (error.reason || error.message);
			}
		}
		task.error(new Error(errorMsg));
	}

	return couchdbHelper;
});