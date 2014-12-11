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
    //var eventMgr;
    mysyncURL.settingsBlock = mysyncURLSettingsBlockHTML;
    mysyncURL.defaultConfig = {
        couchdbserver: settings.couchdbserver,
        couchdb: settings.couchdb,
        couchdburl: settings.couchdburl
    };

    mysyncURL.onLoadSettings = function() {
        utils.setInputValue("#input-settings-mywriteon", mysyncURL.config.couchdb);
        utils.setInputValue("#input-settings-mywriteon-server", mysyncURL.config.couchdbserver);
        utils.setInputValue("#input-settings-mywriteon-url", mysyncURL.config.couchdburl);
    };

    mysyncURL.onSaveSettings = function(newConfig) {
        var newSettings = {};
        newConfig.couchdburl = mysyncURL.config.couchdbserver + '/' + utils.getInputTextValue("#input-settings-mywriteon");
        newConfig.couchdb = utils.getInputTextValue("#input-settings-mywriteon");
        newSettings.couchdburl = mysyncURL.config.couchdbserver + '/' + utils.getInputTextValue("#input-settings-mywriteon");
        newSettings.couchdb = utils.getInputTextValue("#input-settings-mywriteon");
    };
    
   
    
    return mysyncURL;

});
