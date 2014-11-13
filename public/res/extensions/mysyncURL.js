define([
	"jquery",
	"underscore",
	'classes/Extension',
    "text!html/mysyncURLSettingsBlock.html"
], function(_, $, Extension, mysyncURLSettingsBlockHTML) {

	var mysyncURL = new Extension('mysyncURL', 'My.WriteOn Sync URL', false, true);
    mysyncURL.settingsBlock = mysyncURLSettingsBlockHTML;
	return mysyncURL;

});
