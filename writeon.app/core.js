/*globals Markdown, requirejs */
define([
	"jquery",
	"underscore",
	"crel",
	"editor",
	"layout",
	"constants",
	"utils",
	"storage",
	"settings",
	"eventMgr",
	"monetizejs",
	"Slider",
	"text!html/bodyEditor.html",
	"text!html/bodyViewer.html",
	"text!html/tooltipSettingsTemplate.html",
	"text!html/tooltipDropboxTemplate.html",
	"text!html/tooltipGoogleTemplate.html",
	"text!html/tooltipMyWriteOnTemplate.html",
	"text!html/tooltipSettingsPdfOptions.html",
	"storage",
	"pagedown"
], function($, _, crel, editor, layout, constants, utils, storage, settings, eventMgr, MonetizeJS, Slider, bodyEditorHTML, bodyViewerHTML, settingsTemplateTooltipHTML, settingsDropboxTooltipHTML, settingsMyWriteonTooltipHTML, settingsPdfOptionsTooltipHTML) {

	var core = {};

	// Used for periodic tasks
	var intervalId;

	// Used to detect user activity
	var isUserReal = false;
	var userActive = false;
	var windowUnique = true;
	var userLastActivity = 0;

	function setUserActive() {
		isUserReal = true;
		userActive = true;
		var currentTime = utils.currentTime;
		if(currentTime > userLastActivity + 1000) {
			userLastActivity = currentTime;
			eventMgr.onUserActive();
		}
	}

	function isUserActive() {
		if(utils.currentTime - userLastActivity > constants.USER_IDLE_THRESHOLD) {
			userActive = false;
		}
		return userActive && windowUnique;
	}

	// Used to only have 1 window of the application in the same browser
	var windowId;

	function checkWindowUnique() {
		if(isUserReal === false || windowUnique === false) {
			return;
		}
		if(windowId === undefined) {
			windowId = utils.id();
			storage.frontWindowId = windowId;
		}
		var frontWindowId = storage.frontWindowId;
		if(frontWindowId != windowId) {
			windowUnique = false;
			if(intervalId !== undefined) {
				clearInterval(intervalId);
			}
			$(".modal").modal("hide");
			$('.modal-non-unique').modal("show");
			// Attempt to close the window
			window.close();
		}
	}

	// Offline management
	var isOffline = false;
	var offlineTime = utils.currentTime;
	core.setOffline = function() {
		offlineTime = utils.currentTime;
		if(isOffline === false) {
			isOffline = true;
			eventMgr.onOfflineChanged(true);
		}
	};
	function setOnline() {
		if(isOffline === true) {
			isOffline = false;
			eventMgr.onOfflineChanged(false);
		}
	}

	function checkOnline() {
		// Try to reconnect if we are offline but we have some network
		if(isOffline === true && navigator.onLine === true && offlineTime + constants.CHECK_ONLINE_PERIOD < utils.currentTime) {
			offlineTime = utils.currentTime;
			// Try to download anything to test the connection
			$.ajax({
				url: "//www.google.com/jsapi",
				timeout: constants.AJAX_TIMEOUT,
				dataType: "script"
			}).done(function() {
				setOnline();
			});
		}
	}

	// Load settings in settings dialog
	var $themeInputElt;

	function loadSettings() {

		// Layout orientation
		utils.setInputRadio("radio-layout-orientation", settings.layoutOrientation);
		// Theme
		utils.setInputValue($themeInputElt, window.theme);
		$themeInputElt.change();
		// Lazy rendering
		utils.setInputChecked("#input-settings-lazy-rendering", settings.lazyRendering);
		// Editor font class
		utils.setInputRadio("radio-settings-editor-font-class", settings.editorFontClass);
		// Font size ratio
		utils.setInputValue("#input-settings-font-size", settings.fontSizeRatio);
		// Max width ratio
		utils.setInputValue("#input-settings-max-width", settings.maxWidthRatio);
		// Cursor locking ratio
		utils.setInputValue("#input-settings-cursor-focus", settings.cursorFocusRatio);
		// Default content
		utils.setInputValue("#textarea-settings-default-content", settings.defaultContent);
		// Edit mode
		utils.setInputRadio("radio-settings-edit-mode", settings.editMode);
		// Markdown MIME type
		utils.setInputValue("#input-settings-markdown-mime-type", settings.markdownMimeType);
		// Gdrive multi-accounts
		utils.setInputValue("#input-settings-gdrive-multiaccount", settings.gdriveMultiAccount);
		// Gdrive full access
		utils.setInputChecked("#input-settings-gdrive-full-access", settings.gdriveFullAccess);
		// Dropbox full access
		utils.setInputChecked("#input-settings-dropbox-full-access", settings.dropboxFullAccess);
		// GitHub full access
		utils.setInputChecked("#input-settings-github-full-access", settings.githubFullAccess);
		// Template
		utils.setInputValue("#textarea-settings-publish-template", settings.template);
		// PDF template
		utils.setInputValue("#textarea-settings-pdf-template", settings.pdfTemplate);
		// PDF options
		utils.setInputValue("#textarea-settings-pdf-options", settings.pdfOptions);
		// WriteOn Support (commit) message
		utils.setInputValue("#input-settings-publish-commit-msg", settings.commitMsg);
		// CouchDB URL
		//utils.setInputValue("#input-settings-mywriteon-url", settings.couchdbUrl);

		// Load extension settings
		eventMgr.onLoadSettings();
	}

	// Save settings from settings dialog
	function saveSettings(event) {
		var newSettings = {};

		// Layout orientation
		newSettings.layoutOrientation = utils.getInputRadio("radio-layout-orientation");
		// Theme
		var theme = utils.getInputValue($themeInputElt);
		// Lazy Rendering
		newSettings.lazyRendering = utils.getInputChecked("#input-settings-lazy-rendering");
		// Editor font class
		newSettings.editorFontClass = utils.getInputRadio("radio-settings-editor-font-class");
		// Font size ratio
		newSettings.fontSizeRatio = utils.getInputFloatValue("#input-settings-font-size", event, 0.1, 10);
		// Max width ratio
		newSettings.maxWidthRatio = utils.getInputFloatValue("#input-settings-max-width", event, 0.1, 20);
		// Cursor locking ratio
		newSettings.cursorFocusRatio = utils.getInputFloatValue("#input-settings-cursor-focus", event, 0, 1);
		// Default content
		newSettings.defaultContent = utils.getInputValue("#textarea-settings-default-content");
		// Edit mode
		newSettings.editMode = utils.getInputRadio("radio-settings-edit-mode");
		// Gdrive multi-accounts
		newSettings.gdriveMultiAccount = utils.getInputIntValue("#input-settings-gdrive-multiaccount");
		// Markdown MIME type
		newSettings.markdownMimeType = utils.getInputValue("#input-settings-markdown-mime-type");
		// Gdrive full access
		newSettings.gdriveFullAccess = utils.getInputChecked("#input-settings-gdrive-full-access");
		// Drobox full access
		newSettings.dropboxFullAccess = utils.getInputChecked("#input-settings-dropbox-full-access");
		// GitHub full access
		newSettings.githubFullAccess = utils.getInputChecked("#input-settings-github-full-access");
		// Template
		newSettings.template = utils.getInputTextValue("#textarea-settings-publish-template", event);
		// PDF template
		newSettings.pdfTemplate = utils.getInputTextValue("#textarea-settings-pdf-template", event);
		// PDF options
		newSettings.pdfOptions = utils.getInputJSONValue("#textarea-settings-pdf-options", event);
		// WriteOn Support (commit) message
		newSettings.commitMsg = utils.getInputTextValue("#input-settings-publish-commit-msg", event);
		// NEEDS TO MOVED INTO EXTENSION AND COUCHHELPER/PROVIDER UPDATED
		// My.WriteOn (CouchDB) URL
        newSettings.couchdburl = settings.couchdbserver + '/' + utils.getInputTextValue("#input-settings-mywriteon");
        newSettings.couchdb = utils.getInputTextValue("#input-settings-mywriteon");

		// Save extension settings
		newSettings.extensionSettings = {};
		eventMgr.onSaveSettings(newSettings.extensionSettings, event);
        //alert(JSON.stringify(newSettings.extensionSettings));
        //alert(JSON.stringify(newSettings.settings));

		if(!event.isPropagationStopped()) {
			if(settings.dropboxFullAccess !== newSettings.dropboxFullAccess) {
				storage.removeItem('dropbox.lastChangeId');
			}
			$.extend(settings, newSettings);
			storage.settings = JSON.stringify(settings);
			storage.themeV4 = theme;
		}
	}

	// Create the PageDown editor
	// TODO: implement {writeon-pad} editor
	var pagedownEditor;
	var fileDesc;
	core.initEditor = function(fileDescParam) {
		if(fileDesc !== undefined) {
			eventMgr.onFileClosed(fileDesc);
		}
		fileDesc = fileDescParam;

		if(pagedownEditor !== undefined) {
			// If the editor is already created
			editor.undoMgr.init();
			return pagedownEditor.uiManager.setUndoRedoButtonStates();
		}

		// Create the converter and the editor
		// TODO: implement {writeon-pad} converter
		var converter = new Markdown.Converter();
		var options = {
			_DoItalicsAndBold: function(text) {
				// Restore original markdown implementation
				text = text.replace(/(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\1/g,
					"<strong>$2</strong>");
				text = text.replace(/(\*|_)(?=\S)(.+?)(?=\S)\1/g,
					"<em>$2</em>");
				return text;
			}
		};
		// TODO: implement {writeon-pad} editor
		converter.setOptions(options);
		pagedownEditor = new Markdown.Editor(converter, undefined, {
			undoManager: editor.undoMgr
		});

		// Custom insert link dialog
		pagedownEditor.hooks.set("insertLinkDialog", function(callback) {
			core.insertLinkCallback = callback;
			utils.resetModalInputs();
			$(".modal-insert-link").modal();
			return true;
		});
		// Custom insert image dialog
		pagedownEditor.hooks.set("insertImageDialog", function(callback) {
			core.insertLinkCallback = callback;
			if(core.catchModal) {
				return true;
			}
			utils.resetModalInputs();
			$(".modal-insert-image").modal();
			return true;
		});

		// TODO: implement {writeon-pad} editor instance
		//       https://github.com/BeardandFedora/WriteOn-Pad/
		eventMgr.onPagedownConfigure(pagedownEditor);
		pagedownEditor.hooks.chain("onPreviewRefresh", eventMgr.onAsyncPreview);
		pagedownEditor.run();
		editor.undoMgr.init();
		
		/* Load the CodeMirror plugin on textarea
  			CodeMirror.fromTextArea(document.getElementsByClassName("codeme"), {
    			lineNumbers: true,
    			mode: "htmlmixed",
				theme: "midnight"
  			});
		*/
		/* Load the Ace editor plugin on textarea
		var aceeditor = ace.edit("textarea-settings-publish-template");
    	aceeditor.setTheme("ace/theme/cobalt");
    	aceeditor.getSession().setMode("ace/mode/javascript");
		*/
		

		// Hide default buttons
		$(".wmd-button-row li").addClass("btn btn-default").css("left", 0).find("span").hide();

		// Add customized buttons
		// TODO: implement {writeon-pad} editor/viewer toggle syntax hint button
		var $btnGroupElt = $('.wmd-button-group1');
		$("#wmd-bold-button").append($('<i class="icon-bold">')).appendTo($btnGroupElt);
		$("#wmd-italic-button").append($('<i class="icon-italic">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group2');
		$("#wmd-link-button").append($('<i class="icon-globe">')).appendTo($btnGroupElt);
		$("#wmd-image-button").append($('<i class="icon-picture">')).appendTo($btnGroupElt);
		$("#wmd-quote-button").append($('<i class="icon-indent-right">')).appendTo($btnGroupElt);
		$("#wmd-code-button").append($('<i class="icon-code">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group3');
		$("#wmd-olist-button").append($('<i class="icon-list-numbered">')).appendTo($btnGroupElt);
		$("#wmd-ulist-button").append($('<i class="icon-list-bullet">')).appendTo($btnGroupElt);
		$("#wmd-heading-button").append($('<i class="icon-text-height">')).appendTo($btnGroupElt);
		$("#wmd-hr-button").append($('<i class="icon-ellipsis">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group5');
		$("#wmd-undo-button").append($('<i class="icon-reply">')).appendTo($btnGroupElt);
		$("#wmd-redo-button").append($('<i class="icon-forward">')).appendTo($btnGroupElt);
		// Custom editor button tooltips loaded with the editor
		// In this order: selector, content, placement, trigger, container
		// See Bootstrap tooltip docs for help
		utils.createTooltip(".wmd-bold-button", "Bold", "bottom", "hover", "body");
		utils.createTooltip(".wmd-italic-button", "Italicize", "bottom", "hover", "body");
		utils.createTooltip(".wmd-link-button", "Insert Hyperlink", "bottom", "hover", "body");
		utils.createTooltip(".wmd-image-button", "Insert Image", "bottom", "hover", "body");
		utils.createTooltip(".wmd-quote-button", "Blockquote", "bottom", "hover", "body");
		utils.createTooltip(".wmd-code-button", "Codeblock", "bottom", "hover", "body");
		utils.createTooltip(".wmd-olist-button", "Numbered List", "bottom", "hover", "body");
		utils.createTooltip(".wmd-ulist-button", "Bullet List", "bottom", "hover", "body");
		utils.createTooltip(".wmd-heading-button", "Heading", "bottom", "hover", "body");
		utils.createTooltip(".wmd-hr-button", "Insert Horizontal Rule", "bottom", "hover", "body");
		utils.createTooltip(".wmd-undo-button", "Undo", "bottom", "hover", "body");
		utils.createTooltip(".wmd-redo-button", "Redo", "bottom", "hover", "body");

	};

	// Initialize multiple things and then fire eventMgr.onReady
	core.onReady = function() {
		// Add RTL class
		document.body.className += ' ' + settings.editMode;

		if(window.viewerMode === true) {
			document.body.innerHTML = bodyViewerHTML;
		}
		else {
			document.body.innerHTML = bodyEditorHTML;
		}

		// Initialize utils library
		utils.init();

		// listen to online/offline events
		$(window).on('offline', core.setOffline);
		$(window).on('online', setOnline);
		if(navigator.onLine === false) {
			core.setOffline();
		}
		
		// Detect user activity
		$(document).mousemove(setUserActive).keypress(setUserActive);

		layout.init();
		editor.init();

		// Do periodic tasks
		intervalId = window.setInterval(function() {
			utils.updateCurrentTime();
			checkWindowUnique();
			if(isUserActive() === true || window.viewerMode === true) {
				eventMgr.onPeriodicRun();
				checkOnline();
			}
		}, 1000);

		eventMgr.onReady();
	};

   
    
    
	// MonetizeJS user flow payment hooks for UI - using Stripe as the processor
    //   Story: As a developer I want to manage the Stripe payment service through an API and management interface for 
    //   both testing & production scenarios.
    // MonetizeJS settings - http://api.monetizejs.com
    // Stripe settings - http://stripe.com
    // 
    /*
    var appId = '5d7PNYmOeEl4ANys';
	var monetize = new MonetizeJS({
		applicationID: appId
	});
	var $alerts = $();

	function isSponsor(payments) {
		var result = payments && payments.app == appId && (
			(payments.chargeOption && payments.chargeOption.alias == 'writer') ||
			(payments.subscriptionOption && payments.subscriptionOption.alias == 'monthly'));
		eventMgr.isSponsor = result;
		return result;
	}

	function removeAlerts() {
		$alerts.remove();
		$alerts = $();
	}

	function performPayment() {
		monetize.getPayments({
			pricingOptions: [
				'monthly',
				'writer'
			]
		}, function(err, payments) {
			if(isSponsor(payments)) {
                eventMgr.onMessage('Thank you for sponsoring WriteOn! You are soo awesome :)');
				removeAlerts();
			}
		});
	}

	 var checkPayment = _.debounce(function() {
		if(isOffline) {
			return;
		}
		monetize.getPaymentsImmediate(function(err, payments) {
			removeAlerts();
			if(!isSponsor(payments)) {
				_.each(document.querySelectorAll('.monetize'), function(modalBodyElt) {
					var $elt = $('<div class="alert alert-info"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please consider <a href="#">sponsoring</a> WriteOn to keep the <code>awesome</code> coming.</div>');
					$elt.find('a').click(performPayment);
					modalBodyElt.insertBefore($elt[0], modalBodyElt.firstChild);
					$alerts = $alerts.add($elt);
				});
			}
		});
	}, 3000);

	***
	*** //END Monetization
	*/
	
	
	// Check online or offline status
	eventMgr.addListener('onOfflineChanged');
	
    /* ******************
     * ***** To check Monetization when 
     * ***** online status changes, use below
     * ******************
    */
    // eventMgr.addListener('onOfflineChanged', checkPayment);
    
    
	// Other initializations that are not priority
	eventMgr.addListener("onReady", function() {
        
		$(document.body).on('shown.bs.modal', '.modal', function() {
			var $elt = $(this);
			setTimeout(function() {
				// When modal opens focus on the first button
				$elt.find('.btn:first').focus();
				// Or on the first link if any
				$elt.find('button:first').focus();
				// Or on the first input if any
				 $elt.find("input:enabled:visible:first").focus();
			}, 50);
		}).on('hidden.bs.modal', '.modal', function() {
			// Focus on the editor when modal is gone
			editor.focus();
			// Revert to current theme when settings modal is closed
			applyTheme(window.theme);
		}).on('keypress', '.modal', function(e) {
			// Handle enter key in modals
			if(e.which == 13 && !$(e.target).is("textarea")) {
				$(this).find(".modal-footer a:last").click();
			}
		});

		// Click events on "insert link" and "insert image" dialog buttons
		$(".action-insert-link").click(function(e) {
			var value = utils.getInputTextValue($("#input-insert-link"), e);
			if(value !== undefined) {
				core.insertLinkCallback(value);
				core.insertLinkCallback = undefined;
			}
		});
		$(".action-insert-image").click(function(e) {
			var value = utils.getInputTextValue($("#input-insert-image"), e);
			if(value !== undefined) {
				core.insertLinkCallback(value);
				core.insertLinkCallback = undefined;
			}
		});

		// Hide events on "insert link" and "insert image" dialogs
		$(".modal-insert-link, .modal-insert-image").on('hidden.bs.modal', function() {
			if(core.insertLinkCallback !== undefined) {
				core.insertLinkCallback(null);
				core.insertLinkCallback = undefined;
			}
		});

		// Settings loading/saving
		$(".action-load-settings").click(function() {
			loadSettings();
		});
		$(".action-apply-settings").click(function(e) {
			saveSettings(e);
			if(!e.isPropagationStopped()) {
				window.location.reload();
			}
		});
		$('.action-add-google-drive-account').click(function() {
			if(settings.gdriveMultiAccount === 3) {
				return;
			}
			settings.gdriveMultiAccount++;
			storage.settings = JSON.stringify(settings);
			window.location.reload();
		});

		// Hot theme switcher in the settings
		var currentTheme = window.theme;

		function applyTheme(theme) {
			theme = theme || 'gray';
			if(currentTheme != theme) {
				var themeModule = "less!themes/" + theme;
				if(window.baseDir.indexOf('writeon') !== -1) {
					themeModule = "css!themes/" + theme;
				}
				// Undefine the module in RequireJS
				requirejs.undef(themeModule);
				// Then reload the style
				require([
					themeModule
				]);
				currentTheme = theme;
			}
		}

		$themeInputElt = $("#input-settings-theme");
		$themeInputElt.on("change", function() {
			applyTheme(this.value);
		});

		// Import docs and settings
		$(".action-import-docs-settings").click(function() {
			$("#input-file-import-docs-settings").click();
		});
		var newstorage;
		$("#input-file-import-docs-settings").change(function(evt) {
			var files = (evt.dataTransfer || evt.target).files;
			$(".modal-settings").modal("hide");
			_.each(files, function(file) {
				var reader = new FileReader();
				reader.onload = (function(importedFile) {
					return function(e) {
						try {
							newstorage = JSON.parse(e.target.result);
							// Compare storage version
							var newVersion = parseInt(newstorage.version.match(/^v(\d+)$/)[1], 10);
							var currentVersion = parseInt(storage.version.match(/^v(\d+)$/)[1], 10);
							if(newVersion > currentVersion) {
								// We manage storage upgrade, not downgrade
								eventMgr.onError("Incompatible version. Please upgrade WriteOn.");
							} else {
								$('.modal-import-docs-settings').modal('show');
							}
						}
						catch(exc) {
							eventMgr.onError("Wrong format: " + importedFile.name);
						}
						$("#input-file-import-docs-settings").val('');
					};
				})(file);
				reader.readAsText(file);
			});
		});
		$(".action-import-docs-settings-confirm").click(function() {
			storage.clear();
			var allowedKeys = /^file\.|^folder\.|^publish\.|^settings$|^sync\.|^google\.|^author\.|^themeV4$|^version$/;
			_.each(newstorage, function(value, key) {
				if(allowedKeys.test(key)) {
					storage[key] = value;
				}
			});
			window.location.reload();
		});
		// Export settings
		$(".action-export-docs-settings").click(function() {
			utils.saveAs(JSON.stringify(storage), "WriteOn local storage.json");
		});

		$(".action-default-settings").click(function() {
			storage.removeItem("settings");
			storage.removeItem("theme");
			if(!settings.dropboxFullAccess) {
				storage.removeItem('dropbox.lastChangeId');
			}
			window.location.reload();
		});

		$(".action-app-reset").click(function() {
			storage.clear();
			window.location.reload();
		});

		// Reset inputs
		$(".action-reset-input").click(function() {
			utils.resetModalInputs();
		});

		// Tooltips and helpers within the app
		// In this order: selector, content, placement, trigger, container
		// See Bootstrap tooltip docs for help
		
		// Disable tooltips on mobile
		$(".tooltip-trigger").on('show', function (e) {
			if ('ontouchstart' in document.documentElement) { e.preventDefault(); }
		});
		// Toolbar & action tooltips. This should be in json. 
		utils.createTooltip(".button-open-discussion", "Insert Comment", "bottom", "hover", "body");
		utils.createTooltip(".title-container", "Rename Story", "bottom", "hover", "body");
		utils.createTooltip(".tooltip-sync", "Sync", "bottom", "hover", "body");		
		utils.createTooltip(".tooltip-publish", "Publish", "bottom", "hover", "body");		
		utils.createTooltip(".tooltip-download", "Download", "bottom", "hover", "body");
		utils.createTooltip(".tooltip-story-panel", "My Stories", "bottom", "hover", "body");
		utils.createTooltip(".action-create-file", "New Story", "bottom", "hover", ".story-panel");
		utils.createTooltip(".action-remove-file-confirm", "Delete Story", "bottom", "hover", ".story-panel");		
		utils.createTooltip(".action-dm", "Manage Stories", "bottom", "hover", ".story-panel");		
		utils.createTooltip(".story-menu", "Import Stories", "bottom", "hover", ".story-panel");		
		//utils.createTooltip(".settings-menu", "My Settings", "right", "hover", "body");

		// General purpose helpers. This should be in json
		utils.createTooltip(".tooltip-lazy-rendering", 'Disable preview rendering while typing in order to offload CPU. Refresh preview after 500 ms of inactivity.', "right", "hover", "modal");
		utils.createTooltip(".tooltip-default-content", [
			'Thanks for supporting WriteOn by adding a backlink in your stories! You can also leave this blank - thanks for using WriteOn!',
		].join(''), "right", "hover", "modal");
		utils.createTooltip(".tooltip-delete", '<p>This only deletes the local story.</p><p>Any synchronized or published stories will not be affected.</p>', "right", "hover", "modal");
		utils.createTooltip(".tooltip-template", settingsTemplateTooltipHTML, "right", "hover", "modal");
		utils.createTooltip(".tooltip-publish-template", settingsTemplateTooltipHTML, "right", "hover", "modal");
		utils.createTooltip(".tooltip-pdf-template", settingsTemplateTooltipHTML, "right", "hover", "modal");
		utils.createTooltip(".tooltip-dropbox", settingsDropboxTooltipHTML, "right", "hover", "modal");
		utils.createTooltip(".tooltip-mywriteon", settingsMyWriteonTooltipHTML, "right", "hover", "modal");
		utils.createTooltip(".tooltip-dm-stories", "Number of Stories", "bottom", "hover", "modal");
		utils.createTooltip(".tooltip-dm-folders", "Number of Storybooks", "bottom", "hover", "modal");
		utils.createTooltip(".tooltip-remove-sync-loc", "Removing a synchronized location will not delete the local story.", "right", "hover", "modal");
		utils.createTooltip(".tooltip-manage-publications", "<b>Stating the Obvious?</b> Maybe, but removing a published location here will not delete the actual post out in the wild.", "top", "hover", "modal");		
		utils.createTooltip(".tooltip-pdf-options", settingsPdfOptionsTooltipHTML, "right", "hover", "modal");
		utils.createTooltip(".layout-toggler-navbar", "Distraction free mode", "left", "hover", ".layout-wrapper-l3");		
		utils.createTooltip(".layout-toggler-preview", "Live preview", "left", "hover", ".layout-wrapper-l3");		
		utils.createTooltip(".tooltip-open-guide", "Open the Writer's Guide To Writing", "bottom", "hover", ".layout-wrapper-l3");		
		
		// Close tooltips on click  
		$('.tooltip-trigger').click(function(event) {
    		$('.tooltip-trigger').tooltip('hide');
		});
		
		// Avoid dropdown panels to close on click
		$("div.dropdown-menu").click(function(e) {
			e.stopPropagation();
		});

		// Non unique window dialog
		$('.modal-non-unique').modal({
			backdrop: "static",
			keyboard: false,
			show: false
		});

		// Load images
		_.each(document.querySelectorAll('img'), function(imgElt) {
			var $imgElt = $(imgElt);
			var src = $imgElt.data('writeonSrc');
			if(src) {
				$imgElt.attr('src', window.baseDir + '/img/' + src);
			}
		});

		if(window.viewerMode === false) {
			// Load theme list
			var themeOptions = _.reduce(constants.THEME_LIST, function(themeOptions, name, value) {
				return themeOptions + '<option value="' + value + '">' + name + '</option>';
			}, '');
			document.getElementById('input-settings-theme').innerHTML = themeOptions;
		}
		// Load Bootstap Plugins, such as Input Slider, for Settings
		$("#input-settings-font-size").slider({value: settings.fontSizeRatio});
		$("#input-settings-max-width").slider({value: settings.maxWidthRatio});
		$("#input-settings-cursor-focus").slider({value: settings.cursorFocusRatio});
		

		//$('.modal-header').append('<a class="dialog-header-message" href="https://github.com/beardandfedora/WriteOn/issues" target="_blank">Give your feedback <i class="icon-megaphone"></i></a>');
		
        /* ******************
         * ***** Monetization
         * ******************
        */
        //checkPayment();
	});

	return core;
});
