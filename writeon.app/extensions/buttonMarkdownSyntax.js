define([
    "jquery",
    "classes/Extension",
    "text!html/buttonMarkdownSyntax.html",
], function($, Extension, buttonMarkdownSyntaxHTML) {

    var buttonMarkdownSyntax = new Extension("buttonMarkdownSyntax", 'Syntax Help', true, true);
    buttonMarkdownSyntax.settingsBlock = '<p>Adds a "WriteOn Syntax Help" button.</p>';

    buttonMarkdownSyntax.onCreatePreviewButton = function() {
        return buttonMarkdownSyntaxHTML;
    };

    return buttonMarkdownSyntax;

});