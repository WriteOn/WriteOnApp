define([
    "jquery",
    "classes/Extension",
    "text!html/buttonMarkdownSyntax.html",
], function($, Extension, buttonMarkdownSyntaxHTML) {

    var buttonMarkdownSyntax = new Extension("buttonMarkdownSyntax", 'Button "WriteOn syntax', true, true);
    buttonMarkdownSyntax.settingsBlock = '<p>Adds a "WriteOn syntax" button over the preview.</p>';

    buttonMarkdownSyntax.onCreatePreviewButton = function() {
        return buttonMarkdownSyntaxHTML;
    };

    return buttonMarkdownSyntax;

});