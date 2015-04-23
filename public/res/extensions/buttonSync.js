define([
    "jquery",
    "underscore",
    "crel",
    "utils",
    "classes/Extension",
    "mousetrap",
    "text!html/buttonSyncSettingsBlock.html",
], function($, _, crel, utils, Extension, mousetrap, buttonSyncSettingsBlockHTML) {

    var buttonSync = new Extension("buttonSync", 'Button "Synchronize"', false, true);
    buttonSync.settingsBlock = buttonSyncSettingsBlockHTML;
    buttonSync.defaultConfig = {
        syncPeriod: 180000,
        syncShortcut: 'mod+s'
    };

    buttonSync.onLoadSettings = function() {
        utils.setInputValue("#input-sync-period", buttonSync.config.syncPeriod);
        utils.setInputValue("#input-sync-shortcut", buttonSync.config.syncShortcut);
    };

    buttonSync.onSaveSettings = function(newConfig, event) {
        newConfig.syncPeriod = utils.getInputIntValue("#input-sync-period", event, 0);
        newConfig.syncShortcut = utils.getInputTextValue("#input-sync-shortcut", event);
    };

    var synchronizer;
    buttonSync.onSynchronizerCreated = function(synchronizerParameter) {
        synchronizer = synchronizerParameter;
    };

    var $button;
    var syncRunning = false;
    var isOffline = false;
    // Enable/disable the button
    var updateButtonState = function() {
        if($button === undefined) {
            return;
        }
        if(syncRunning === true || synchronizer.hasSync() === false || isOffline) {
            $button.addClass("disabled");
        }
        else {
            $button.removeClass("disabled");
        }
    };

    // Run sync periodically
    var lastSync = 0;
    buttonSync.onPeriodicRun = function() {
        if(!buttonSync.config.syncPeriod || lastSync + buttonSync.config.syncPeriod > utils.currentTime) {
            return;
        }
        synchronizer.sync() && (lastSync = utils.currentTime);
    };

    buttonSync.onCreateSyncButton = function() {
        var button = crel('a', {
            class: 'button-synchronize action-force-synchronization',
            title: 'Force Sync Ctrl/Cmd+S',
            href: '#'
        }, crel('i', {
            class: 'icon-refresh'
        }), crel('span', ' Sync Now'));
        $button = $(button);
        $button.click(function() {
            if(!$button.hasClass("disabled")) {
                synchronizer.sync() && (lastSync = utils.currentTime);
            }
        });
        return button;
    };
    buttonSync.onCreateSyncMngButton = function() {
        var button = crel('a', {
            class: 'action-reset-input',
            title: 'Manage Syncs',
            href: '#',
            'data-target': '.modal-manage-sync',
            'data-toggle': 'modal'
        }, crel('i', {
            class: 'icon-edit'
        }), crel('span', ' Manage'));
        $button = $(button);
        return button;
    };
    buttonSync.onReady = updateButtonState;
    buttonSync.onFileCreated = updateButtonState;
    buttonSync.onFileDeleted = updateButtonState;
    buttonSync.onSyncImportSuccess = updateButtonState;
    buttonSync.onSyncExportSuccess = updateButtonState;
    buttonSync.onSyncRemoved = updateButtonState;

    buttonSync.onSyncRunning = function(isRunning) {
        syncRunning = isRunning;
        updateButtonState();
    };

    buttonSync.onOfflineChanged = function(isOfflineParameter) {
        isOffline = isOfflineParameter;
        updateButtonState();
    };

    buttonSync.onReady = function() {
        mousetrap.bind(buttonSync.config.syncShortcut, function(e) {
            synchronizer.sync() && (lastSync = utils.currentTime);
            e.preventDefault();
        });
        $(".action-force-synchronization").click(function() {
            synchronizer.sync() && (lastSync = utils.currentTime);
        });
    };

    return buttonSync;

});
