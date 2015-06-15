define([
    "jquery",
    "underscore",
    "crel",
    "classes/Extension",
], function($, _, crel, Extension) {

    var buttonPublish = new Extension("buttonPublish", 'Publish', false, true);
    buttonPublish.settingsBlock = '<p>Enables publishing local stories to other platforms like Wordpress, Tumblr, Blogger and more.</p>';

    var $button;
    var currentFileDesc;
    var publishRunning = false;
    var hasPublications = false;
    var isOffline = false;
    // Enable/disable the button
    function updateButtonState() {
        if($button === undefined) {
            return;
        }
        if(publishRunning === true || hasPublications === false || isOffline === true) {
            $button.addClass("disabled");
        }
        else {
            $button.removeClass("disabled");
        }
    }

    var publisher;
    buttonPublish.onPublisherCreated = function(publisherParameter) {
        publisher = publisherParameter;
    };

    buttonPublish.onCreatePubButton = function() {
        var button = crel('a', {
            class: 'button-publish action-reset-input action-update-publication',
            title: 'Update published story',
            href: '#'
        }, crel('i', {
            class: 'icon-share'
        }), crel('span', ' Republish Now'));
        $button = $(button);
        $button.click(function() {
            if(!$button.hasClass("disabled")) {
                publisher.publish();
            }
        });
        return button;
    };

    buttonPublish.onCreatePubMngButton = function() {
        var button = crel('a', {
            class: 'action-reset-input',
            title: 'Manage publications',
            href: '#',
            'data-target': '.modal-manage-publish',
            'data-toggle': 'modal'
        }, crel('i', {
            class: 'icon-edit'
        }), crel('span', ' Manage'));
        $button = $(button);
        return button;
    };

    buttonPublish.onPublishRunning = function(isRunning) {
        publishRunning = isRunning;
        updateButtonState();
    };

    buttonPublish.onOfflineChanged = function(isOfflineParameter) {
        isOffline = isOfflineParameter;
        updateButtonState();
    };

    // Check that current file has publications
    var checkPublication = function() {
        if(_.size(currentFileDesc.publishLocations) === 0) {
            hasPublications = false;
        }
        else {
            hasPublications = true;
        }
        updateButtonState();
    };

    buttonPublish.onFileSelected = function(fileDesc) {
        currentFileDesc = fileDesc;
        checkPublication();
    };

    buttonPublish.onReady = function() {
        $(".action-update-publication").click(publisher.publish);
    };

    buttonPublish.onPublishRemoved = checkPublication;
    buttonPublish.onNewPublishSuccess = checkPublication;

    return buttonPublish;

});
