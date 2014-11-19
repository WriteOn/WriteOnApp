define([
	"jquery",
	"underscore",
    "utils",
    "settings",
	'classes/Extension',
    "text!html/mysyncURLSettingsBlock.html"
], function(_, $, utils, settings, Extension, mysyncURLSettingsBlockHTML) {

	var mysyncURL = new Extension('mysyncURL', 'My.WriteOn Sync URL', false, true);
    mysyncURL.settingsBlock = mysyncURLSettingsBlockHTML;
    mysyncURL.defaultConfig = {
        couchdburl: settings.couchdbUrl
    };

    mysyncURL.onLoadSettings = function() {
        utils.setInputValue("#input-settings-couchdb-url", mysyncURL.config.couchdburl);
    };

    mysyncURL.onSaveSettings = function(newConfig, event) {
        newConfig.couchdburl = utils.getInputIntValue("#input-settings-couchdb-url", event, 1, 60000);
    };
    
    
    return mysyncURL;

});
