define([
    "jquery",
    "classes/Extension",
    "text!html/buttonViewer.html",
], function($, Extension, buttonViewerHTML) {

    var buttonViewer = new Extension("buttonViewer", 'Button "Paper"', true, true);
    buttonViewer.settingsBlock = '<p>Adds a <i class="icon-doc-text"> <strong>Paper</strong></i> button over the preview.</p>';

    buttonViewer.onCreatePreviewButton = function() {
        return buttonViewerHTML;
    };

    return buttonViewer;

});