define([
	"jquery",
	"underscore",
	'classes/Extension',
    "text!html/supportWriteonSettingsBlock.html"
], function(_, $, Extension, supportWriteonSettingsBlockHTML) {

	var supportWriteOn = new Extension('supportWriteOn', 'Support WriteOn', false, true);
    supportWriteOn.settingsBlock = supportWriteonSettingsBlockHTML;
	return supportWriteOn;

});
