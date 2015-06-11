define([
	'underscore',
	'jquery',
	'storage',
	'classes/Extension',
	'bootstrap-tour'
], function(_, $, storage, Extension, Tour) {

	var welcomeTour = new Extension('welcomeTour', 'Welcome Tour', false, true);

	var eventMgr;
	welcomeTour.onEventMgrCreated = function(eventMgrParam) {
		eventMgr = eventMgrParam;
	};

	welcomeTour.onReady = function() {
		function infoTooltip(btnSelector, title, placement, container) {
			var tooltip = $(btnSelector).tooltip({
				html: true,
				//container: $('.extension-preview-buttons'),
				placement: placement,
				trigger: 'manual',
				title: title,
				container: container
			}).tooltip('show').addClass('info-tooltip');
			tooltip.parent().addClass('info-tooltip-container');
			tooltip.one('click', function() {
				tooltip.tooltip('hide').removeClass('info-tooltip').parent().removeClass('info-tooltip-container');
			});
			setTimeout(function() {
				tooltip.tooltip('hide').removeClass('info-tooltip').parent().removeClass('info-tooltip-container');
			}, 30000);
		}

		var tour = new Tour({
			keyboard: false,
			storage: {
				getItem: function() {
				},
				setItem: function() {
				},
				removeItem: function() {
				}
			},
			onEnd: function() {
				storage.welcomeTour = 'done';
				infoTooltip('.drag-me', 'Hover to open me', 'left', 'body');
				infoTooltip('.layout-toggler-preview', 'Toggle live preview', 'left', 'body');
				infoTooltip('.layout-toggler-navbar', 'Distraction free mode', 'left', 'body');
			},
			template: [
				'<div class="popover tour">',
				'   <div class="arrow"></div>',
				'   <h3 class="popover-title"></h3>',
				'   <div class="popover-content"></div>',
				'   <nav class="popover-navigation">',
				'       <button class="btn btn-primary" data-role="next">Next</button>',
				'       <button class="btn btn-default" data-role="end">Got it</button>',
				'   </nav>',
				'</div>'
			].join("")
		});
		tour.addSteps([
			{
				element: '.navbar-inner',
				title: 'Welcome to WriteOn',
				content: [
					'<p>Hi there. WriteOn has been successfully installed. And, since you\'re new here, let\'s take a look around. First things first...with WriteOn, <i class="icon-pencil-squared"> <strong>Pad</strong></i> is where you write, and <i class="icon-doc-text"> <strong>Paper</strong></i> is were you review.</p>',
					'Please tap <b>Next</b> to take a quick tour.'
				].join(""),
				placement: 'bottom'
			},
			{
				element: '.document-panel .toggle-button',
				title: 'My Stories',
				content: [
					'<p>The <i class="icon-folder-open"></i> <b>My Stories</b> panel allows you to open and search for your stories, and gives you quick access to create a new story, organize exsiting stories, and import stories.</p>',
					'<b>Tip:</b> Use <kbd>Ctrl+[</kbd> and <kbd>Ctrl+]</kbd> to toggle local stories.'
				].join(""),
				placement: 'left',
				reflex: true
			},
			{
				element: '.download-menu',
				title: 'Download Menu',
				content: [
					'<p>The <i class="icon-download"></i> <b>Download</b> menu is where you can download your story for offline use, in various formats. </p>',
                    '<b>Tip:</b> You can even download your story using one of our pre-built themes, using the <i class="icon-list-alt"></i> <strong>Template</strong> option.'
				].join(""),
				placement: 'left',
				reflex: true
			},
			{
				element: '.publishing-menu',
				title: 'Publish',
				content: [
					'<p>The <i class="icon-share"></i> <b>Publish</b> menu lets you publish your stories directly to <i class="icon-provider-tumblr"></i> Tumblr, <i class="icon-provider-ghost"></i> Ghost, <i class="icon-provider-wordpress"></i> Wordpress, <i class="icon-provider-blogger"></i> Blogger, and <i class="icon-provider-github"></i> GitHub.</p>',
					'<b>Tip:</b> Use the <i class="icon-share"></i> <b>Republish now</b> option to republish any changes to your story.'
				].join(""),
				placement: 'left',
				reflex: true
			},
			{
				element: '.syncing-menu',
				title: 'Sync Menu',
				content: [
					'<p>The <i class="icon-refresh"></i> <b>Sync & share</b> menu allows you to synchronize your local stories with <i class="icon-provider-mywriteon"></i> My.WriteOn, <i class="icon-provider-gdrive"></i> Google Drive, <i class="icon-provider-dropbox"></i> or Dropbox. </p>',
					'<b>Tip:</b> Use the <i class="icon-refresh"></i> <b>Sync now</b> option to force update your cloud syncs.'
				].join(""),
				placement: 'left',
				reflex: true
			},
			{
				element: '.settings-menu',
				title: 'Menu',
				content: [
					'<p>Use the <i class="icon-menu"></i> <b>Main menu</b> to update your account, settings, extensions, utilities and find help.</p>'				
                ].join(""),
				placement: 'right',
				reflex: true
			},
			{
				element: '.navbar-inner > .nav .button-open-discussion, .navbar .buttons-dropdown > .nav > .btn:not(:hidden)',
				title: 'Comments/discussions',
				content: [
					'<p>Collaborative Writing is useful for most authors, and WriteOn boasts a <i class="icon-comment-alt"></i> <strong>robust, yet simple feature</strong> to facilitate collaboration between authors, editors, publishers and readers.</p>',
					'<b>Tip:</b> Built in discussons facilitate communication, while the built-in <strong>merging</strong> feature provides visible progress on collaborative changes.'
				].join(""),
				placement: 'right',
				reflex: true
			},
			{
				element: '.navbar-inner',
				title: 'Happy Writing!',
				content: [
					'<p>Enjoy writing like you always wanted to. Let us know if and when we can be of service to your writing needs by heading over to the <a href="#" data-toggle="modal" data-target=".modal-about"><i class="icon-info"></i> About</a> screen. Psssttt! We would love your feedback, just look for these icons: <i class="icon-megaphone text-blue"></i>, <i class="icon-star-half-alt text-purple"></i>, <i class="icon-chat-empty text-orange"></i>.</p>',
					'<a href="https://twitter.com/share" class="twitter-share-button" data-url="https://writeon.io" data-text="Write like you always wanted to." data-via="writeon" data-size="large"></a>'
				].join(""),
				placement: 'bottom',
				onShown: function() {
					eventMgr.onTweet();
				}
			}
		]);
		if(!_.has(storage, 'welcomeTour')) {
			tour.start();
		}
		$('.action-welcome-tour').click(function() {
			tour.restart();
		});
	};

	return welcomeTour;

});
