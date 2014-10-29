define([], function() {
	var constants = {};
	constants.VERSION = "4.3.1";
	constants.MAIN_URL = "https://storee.io/";
	constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-42099274-1";
	constants.GOOGLE_API_KEY = "AIzaSyBXLSqdVyGe3D8P9rYd_YObKpEY6S2cCfQ";
	constants.GOOGLE_DRIVE_APP_ID = "1017251498254";
	constants.DROPBOX_APP_KEY = "r3vgaee214zfvc7";
	constants.DROPBOX_APP_SECRET = "1mesyckskczn3f9";
	constants.DROPBOX_RESTRICTED_APP_KEY = "r3vgaee214zfvc7";
	constants.DROPBOX_RESTRICTED_APP_SECRET = "1mesyckskczn3f9";
	constants.BITLY_ACCESS_TOKEN = "b9e0e5589e6479a07b699b8dc4d102061b3c0f60";
	constants.DEFAULT_FILE_TITLE = "Title";
	constants.DEFAULT_FOLDER_NAME = "New folder";
	constants.GDRIVE_DEFAULT_FILE_TITLE = "New Story";
	constants.EDITOR_DEFAULT_PADDING = 35;
	constants.CHECK_ONLINE_PERIOD = 120000;
	constants.AJAX_TIMEOUT = 30000;
	constants.ASYNC_TASK_DEFAULT_TIMEOUT = 60000;
	constants.ASYNC_TASK_LONG_TIMEOUT = 180000;
	constants.USER_IDLE_THRESHOLD = 300000;
	constants.IMPORT_FILE_MAX_CONTENT_SIZE = 100000;
	constants.IMPORT_IMG_MAX_CONTENT_SIZE = 10000000;
	constants.COUCHDB_PAGE_SIZE = 25;
	constants.TEMPORARY_FILE_INDEX = "file.tempIndex";
	constants.WELCOME_DOCUMENT_TITLE = "Hello World!";
	constants.DOWNLOAD_IMPORT_URL = "/downloadImport";
	constants.PICASA_IMPORT_IMG_URL = "/picasaImportImg";
	constants.SSH_PUBLISH_URL = '/sshPublish';
	constants.PDF_EXPORT_URL = "/pdfExport";
	constants.COUCHDB_URL = 'https://beardandfedora.couchappy.com/documents';

	// Site dependent
	constants.BASE_URL = "http://localhost/";
	constants.GOOGLE_CLIENT_ID = '94745106015-a2e0n9pl0aqrv3rtp0njsukbu7d5q9sd.apps.googleusercontent.com';
	constants.GITHUB_CLIENT_ID = '20b324f0f33aad6ca2be';
	constants.GATEKEEPER_URL = "https://stackedit-gatekeeper-localhost.herokuapp.com/";
	constants.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy-local.herokuapp.com/";
	constants.WORDPRESS_CLIENT_ID = '37430';
	constants.WORDPRESS_PROXY_URL = "https://stackedit-io-wordpress-proxy.herokuapp.com/";

	if(location.hostname.indexOf("storee.io") === 0) {
		constants.BASE_URL = constants.MAIN_URL;
		constants.GOOGLE_CLIENT_ID = '94745106015-a2e0n9pl0aqrv3rtp0njsukbu7d5q9sd.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = 'af6858e3fa3165986ce7';
		constants.GATEKEEPER_URL = "https://stackedit-io-gatekeeper.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://stackedit-io-tumblr-proxy.herokuapp.com/";
	}
    else if(location.hostname.indexOf("mammal-charter.codio.io:9500") === 0) {
		constants.BASE_URL = 'https://mammal-charter.codio.io:9500/';
		constants.GOOGLE_CLIENT_ID = '94745106015-a2e0n9pl0aqrv3rtp0njsukbu7d5q9sd.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '235008232d0259c2f036';
		constants.GATEKEEPER_URL = "https://stackedit-gatekeeper.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '37431';
		constants.WORDPRESS_PROXY_URL = "https://stackedit-wordpress-proxy.herokuapp.com/";
	}
	else if(location.hostname.indexOf("storee-beta.herokuapp.com") === 0) {
		constants.BASE_URL = 'https://storee-beta.herokuapp.com/';
		constants.GOOGLE_CLIENT_ID = '94745106015-a2e0n9pl0aqrv3rtp0njsukbu7d5q9sd.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = 'e9034ae191c3a8a1c5ed';
		constants.GATEKEEPER_URL = "https://stackedit-beta-gatekeeper.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '34786';
		constants.WORDPRESS_PROXY_URL = "https://stackedit-wordpress-proxy.herokuapp.com/";
	}
    else if(location.hostname.indexOf("mammal-charter.codio.io:3000") === 0) {
        constants.BASE_URL = "http://mammal-charter.codio.io:3000/";
		constants.GOOGLE_CLIENT_ID = '94745106015-a2e0n9pl0aqrv3rtp0njsukbu7d5q9sd.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '302c5c415085534c1346';
		constants.GATEKEEPER_URL = "https://stackedit-gatekeeper-insomnia.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://stackedit-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '37432';
		constants.WORDPRESS_PROXY_URL = "https://stackedit-wordpress-proxy.herokuapp.com/";
    }

	constants.THEME_LIST = {
		"blue": "Blue",
		"default": "Default",
		"gray": "Gray",
		"night": "Night",
		"school": "School",
		"solarized-light": "Solarized Light",
		"solarized-dark": "Solarized Dark"
	};

	return constants;
});
