define([
	"jquery",
	"underscore",
    "constants",
    "utils",
    "settings",
	'classes/Extension',
    "text!html/mysyncURLSettingsBlock.html"
], function(_, $, constants, utils, settings, Extension, mysyncURLSettingsBlockHTML) {

	var mysyncURL = new Extension('mysyncURL', 'My.WriteOn Account', false, true);
    var eventMgr;
    mysyncURL.settingsBlock = mysyncURLSettingsBlockHTML;
    mysyncURL.defaultConfig = {
        couchdbserver: settings.couchdbserver,
        couchdb: settings.couchdb,
        couchdburl: settings.couchdburl
    };

    mysyncURL.onLoadSettings = function() {
        utils.setInputValue("#input-settings-couchdb", mysyncURL.config.couchdb);
        utils.setInputValue("#input-settings-couchdb-url", mysyncURL.config.couchdburl);
    };

    mysyncURL.onSaveSettings = function(newConfig, event) {
        var newSettings = {};
        newConfig.couchdburl = mysyncURL.config.couchdbserver + utils.getInputTextValue("#input-settings-couchdb");
        newConfig.couchdb = utils.getInputTextValue("#input-settings-couchdb");
        newSettings.couchdburl = mysyncURL.config.couchdbserver + utils.getInputTextValue("#input-settings-couchdb");
        newSettings.couchdb = utils.getInputTextValue("#input-settings-couchdb");
    };
    
   
    
    return mysyncURL;

});
