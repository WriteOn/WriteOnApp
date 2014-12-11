// This is the most important part of syncing and publishing - we should make a doc 
// somewhere of all the keys and urls to all the apis being used here...

define([], function() {
	var constants = {};
	constants.VERSION = "1.5.21";
	constants.MAIN_URL = "https://writeon.io/";
	constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-56730909-3";
	constants.GOOGLE_API_KEY = "AIzaSyBXLSqdVyGe3D8P9rYd_YObKpEY6S2cCfQ";
	constants.GOOGLE_DRIVE_APP_ID = "1017251498254";
	constants.DROPBOX_APP_KEY = "r3vgaee214zfvc7";
	constants.DROPBOX_APP_SECRET = "1mesyckskczn3f9";
	constants.DROPBOX_RESTRICTED_APP_KEY = "r3vgaee214zfvc7";
	constants.DROPBOX_RESTRICTED_APP_SECRET = "1mesyckskczn3f9";
	constants.BITLY_ACCESS_TOKEN = "c93d4289b9c1a0313378f1dad028c2d334bbc3c6";
	constants.DEFAULT_FILE_TITLE = "Story Title";
	constants.DEFAULT_FOLDER_NAME = "New Folder";
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
	constants.WELCOME_DOCUMENT_TITLE = "Welcome Guide";
	constants.GUIDE_DOCUMENT_TITLE = "Syntax Guide";
	constants.DOWNLOAD_IMPORT_URL = "/downloadImport";
	constants.PICASA_IMPORT_IMG_URL = "/picasaImportImg";
	constants.SSH_PUBLISH_URL = '/sshPublish';
	constants.PDF_EXPORT_URL = "/pdfExport";
    constants.BOOT_MYWRITEON_URL = "/bootmywriteon";
    constants.COUCHDB_DB = 'documents';
    constants.COUCHDB_SERVER = 'https://cloud1.writeon.io';
    constants.COUCHDB_BASIC_AUTH = 'YmVhcmRhbmRmZWRvcmE6eWFiMGlz';
    constants.COUCHDB_AUTH_SERVER = 'aHR0cHM6Ly9iZWFyZGFuZGZlZG9yYTp5YWIwaXNAd3JpdGVvbi5jb3VjaGFwcHkuY29t';

	// App dependent
	constants.BASE_URL = constants.MAIN_URL;
	constants.GOOGLE_CLIENT_ID = '1017251498254-44f8se5ptroh284ie3ljl2t99s8vk209.apps.googleusercontent.com';
	constants.GITHUB_CLIENT_ID = 'af6858e3fa3165986ce7';
	constants.GATEKEEPER_URL = "https://writeon-gatekeeper.herokuapp.com/";
	constants.TUMBLR_PROXY_URL = "https://writeon-tumblr-proxy.herokuapp.com/";
    constants.GHOST_PROXY_URL = "https://writeon-ghost-proxy.herokuapp.com/";
	constants.WORDPRESS_CLIENT_ID = '37431';
	constants.WORDPRESS_PROXY_URL = "https://writeon-wordpress-proxy.herokuapp.com/";
    
     // PRODUCTION ENVIRONMENT VARIABLE CONSTANTS 
	if(location.hostname.indexOf("writeon.io") === 0) {
		constants.BASE_URL = constants.MAIN_URL;
		constants.GOOGLE_CLIENT_ID = '1017251498254-44f8se5ptroh284ie3ljl2t99s8vk209.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = 'af6858e3fa3165986ce7';
		constants.GATEKEEPER_URL = "https://writeon-gatekeeper.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://writeon-tumblr.herokuapp.com/";
        constants.COUCHDB_SERVER = 'https://cloud1.writeon.io';
	}
     // BETA/STAGING ENVIRONMENT VARIABLE CONSTANTS 
	else if(location.hostname.indexOf("beta.writeon.io") === 0) {
		constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-56730909-1";
        constants.BASE_URL = 'https://beta.writeon.io/';
		constants.GOOGLE_CLIENT_ID = '1017251498254-44f8se5ptroh284ie3ljl2t99s8vk209.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '302c5c415085534c1346';
		constants.GATEKEEPER_URL = "https://writeon-gatekeeper-beta.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://writeon-tumblr-proxy-beta.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '38332';
		constants.WORDPRESS_PROXY_URL = "https://writeon-wordpress-proxy-beta.herokuapp.com/";
        constants.COUCHDB_DB = 'documents';
        constants.COUCHDB_SERVER = 'https://cloud2.writeon.io';

    }
	else if(location.hostname.indexOf("writeon-beta.herokuapp.com") === 0) {
		constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-56730909-1";
        constants.BASE_URL = 'https://writeon-beta.herokuapp.com/';
		constants.GOOGLE_CLIENT_ID = '1017251498254-44f8se5ptroh284ie3ljl2t99s8vk209.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '302c5c415085534c1346';
		constants.GATEKEEPER_URL = "https://writeon-gatekeeper-beta.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://writeon-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '38332';
		constants.WORDPRESS_PROXY_URL = "https://writeon-wordpress-proxy-beta.herokuapp.com/";
        constants.COUCHDB_DB = 'documents';
        constants.COUCHDB_SERVER = 'https://cloud2.writeon.io';

    }
     //DEVELOPMENT ENVIRONMENT VARIABLE CONSTANTS 
    else if(location.hostname.indexOf("mammal-charter.codio.io") === 0) {
		constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-56730909-2";
        constants.BASE_URL = 'https://mammal-charter.codio.io:9500/';
		constants.GOOGLE_CLIENT_ID = '1017251498254-44f8se5ptroh284ie3ljl2t99s8vk209.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '235008232d0259c2f036';
		constants.GATEKEEPER_URL = "https://writeon-gatekeeper-mammal.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://writeon-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '37431';
		constants.WORDPRESS_PROXY_URL = "https://writeon-wordpress-proxy.herokuapp.com/";
        constants.COUCHDB_DB = 'documents';
        constants.COUCHDB_SERVER = 'https://cloud3.writeon.io';
	}
    else if(location.hostname.indexOf("mammal-charter.codio.io:9500") === 0) {
		constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-56730909-2";
        constants.BASE_URL = 'https://mammal-charter.codio.io:9500/';
		constants.GOOGLE_CLIENT_ID = '1017251498254-44f8se5ptroh284ie3ljl2t99s8vk209.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '235008232d0259c2f036';
		constants.GATEKEEPER_URL = "https://writeon-gatekeeper-mammal.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://writeon-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '37431';
		constants.WORDPRESS_PROXY_URL = "https://writeon-wordpress-proxy.herokuapp.com/";
        constants.COUCHDB_DB = 'documents';
        constants.COUCHDB_SERVER = 'https://cloud3.writeon.io';
	}
    else if(location.hostname.indexOf("mammal-charter.codio.io:3000") === 0) {
		constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-56730909-2";
        constants.BASE_URL = 'http://mammal-charter.codio.io:3000/';
		constants.GOOGLE_CLIENT_ID = '1017251498254-44f8se5ptroh284ie3ljl2t99s8vk209.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '235008232d0259c2f036';
		constants.GATEKEEPER_URL = "https://writeon-gatekeeper-mammal.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://writeon-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '37431';
		constants.WORDPRESS_PROXY_URL = "https://writeon-wordpress-proxy.herokuapp.com/";
        constants.COUCHDB_DB = 'documents';
        constants.COUCHDB_SERVER = 'https://cloud3.writeon.io';

    }
    else if(location.hostname.indexOf("mammal-charter.codio.io:9501") === 0) {
        constants.GOOGLE_ANALYTICS_ACCOUNT_ID = "UA-56730909-2";
        constants.BASE_URL = "https://mammal-charter.codio.io:9501/";
		constants.GOOGLE_CLIENT_ID = '1017251498254-44f8se5ptroh284ie3ljl2t99s8vk209.apps.googleusercontent.com';
		constants.GITHUB_CLIENT_ID = '235008232d0259c2f036';
		constants.GATEKEEPER_URL = "https://writeon-gatekeeper-mammal.herokuapp.com/";
		constants.TUMBLR_PROXY_URL = "https://writeon-tumblr-proxy.herokuapp.com/";
		constants.WORDPRESS_CLIENT_ID = '37431';
		constants.WORDPRESS_PROXY_URL = "https://writeon-wordpress-proxy.herokuapp.com/";
        constants.COUCHDB_DB = 'documents';
        constants.COUCHDB_SERVER = 'https://cloud3.writeon.io';

    }

	constants.THEME_LIST = {
		"neat": "Neat",
		"blue": "Blue",
		"gray": "Gray",
		"night": "Night",
		"school": "School",
		"solarized-light": "Solarized",
//		"solarized-dark": "Solarized Dark"
	};

	return constants;
});
