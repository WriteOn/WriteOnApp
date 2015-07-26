define([
	"underscore",
	"constants",
	"storage"
], function(_, constants, storage) {

	var settings = {
		layoutOrientation: "horizontal",
		editMode: 'ltr',
		lazyRendering: true,
		editorFontClass: 'font-rich',
		fontSizeRatio: 1,
		maxWidthRatio: 2,
		cursorFocusRatio: 0.5,
		// defaultContent: "---\n> Written with [WriteOn](" + constants.MAIN_URL + ").",
		defaultContent: "",
		commitMsg: "Published with " + constants.MAIN_URL,
		conflictMode: 'merge',
		markdownMimeType: 'text/plain',
		gdriveMultiAccount: 1,
		gdriveFullAccess: true,
		dropboxFullAccess: true,
		githubFullAccess: true,
		template: [
			'<!DOCTYPE html>',
			'<html>',
			'	<head>',
			'		<meta charset="utf-8">',
			'		<meta name="viewport" content="width=device-width, initial-scale=1.0">',
			'		<title><%= documentTitle %></title>',
			'		<link rel="stylesheet" href="' + constants.MAIN_URL + 'writeon/themes/gray.css" />',
			'	</head>',
				'<body><div class="container"><%= documentHTML %></div></body>',
			'</html>'
		].join('\n'),
		pdfTemplate: [
			'<!DOCTYPE html>',
			'<html>',
			'	<head>',
			'		<meta charset="utf-8">',
			'		<title><%= documentTitle %></title>',
			'		<link rel="stylesheet" href="' + constants.MAIN_URL + 'writeon/themes/gray.css" />',
			'	</head>',
			'	<body><%= documentHTML %></body>',
			'</html>'
		].join('\n'),
		pdfOptions: [
			'{',
			'    "marginTop": 25,',
			'    "marginRight": 25,',
			'    "marginBottom": 25,',
			'    "marginLeft": 25,',
			'    "pageSize": "A4"',
			'}'
		].join('\n'),
		couchdb: constants.COUCHDB_DB,
		couchdbserver: constants.COUCHDB_SERVER,
        // couchdbUrl: constants.COUCHDB_SERVER + '/' + constants.COUCHDB_DB,
        // We are now using couchDB rewrites for security, so now we map the URL
        // to the database at the couchDB DNS level. For example:
        // cloud1.writeon.io/0aM3ECptjbB31cBtRkSIJzOr/content
        // maps to /documents/0aM3ECptjbB31cBtRkSIJzOr/content
        // No more requirement to use the database in the URL for the API
        couchdbUrl: constants.COUCHDB_SERVER,
        couchdbauth: constants.COUCHDB_BASIC_AUTH,
		datastore: constants.DATA_STORE,
		dataservice: constants.DATA_SERVER,
		dataauth: constants.DATA_BASIC_AUTH,		
		extensionSettings: {}
	};

	try {
		_.extend(settings, JSON.parse(storage.settings));
	}
	catch(e) {
		// Ignore parsing error
	}

	return settings;
});
