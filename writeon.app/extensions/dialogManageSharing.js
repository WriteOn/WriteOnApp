define([
	"jquery",
	"underscore",
	"constants",
	"classes/Extension",
	"text!html/dialogManageSharingLocation.html"
], function($, _, constants, Extension, dialogManageSharingLocationHTML) {

	var dialogManageSharing = new Extension("dialogManageSharing", 'Button "Share"', false, true);

	var eventMgr;
	dialogManageSharing.onEventMgrCreated = function(eventMgrParam) {
		eventMgr = eventMgrParam;
	};
	var sharing;
	dialogManageSharing.onSharingCreated = function(sharingParam) {
		sharing = sharingParam;
	};

	var fileDesc;
	var shareEditorListElt;
	var shareViewerListElt;
	var $msgNoShareEditorElt;
	var $msgNoShareViewerElt;
	var refreshDocumentSharing = function(fileDescParameter) {
		if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
			return;
		}

		var editorLinkListHtml = _.reduce(fileDesc.syncLocations, function(result, attributes) {
			var params = sharing.getEditorParams(attributes);
			if(params) {
				var link = constants.BASE_URL + 'pad#!' + $.param(params);
                var icon = 'icon-link text-blue';
                var title = 'Collaboration location';
                var id = 'collab_location';
				result += _.template(dialogManageSharingLocationHTML, {
					link: link,
                    icon: icon,
                    title: title,
                    id: id
				});
			}
			return result;
		}, '');
		shareEditorListElt.innerHTML = editorLinkListHtml;
		$msgNoShareEditorElt.toggleClass('hide', editorLinkListHtml.length !== 0);

		var viewerLinkListHtml = _.reduce(fileDesc.syncLocations, function(result, attributes) {
			var params = sharing.getEditorParams(attributes);
			if(params) {
				var link = constants.BASE_URL + 'paper#!' + $.param(params);
                var icon = 'icon-doc-text-inv text-green';
                var title = 'Sharing location';
                var id = 'sharing_location';
				result += _.template(dialogManageSharingLocationHTML, {
					link: link,
                    icon: icon,
                    title: title,
                    id: id
				});
			}
			return result;
		}, '');
		shareViewerListElt.innerHTML = viewerLinkListHtml;
		$msgNoShareViewerElt.toggleClass('hide', viewerLinkListHtml.length !== 0);
    /*	the below code can be used to show published sharing options, primarily Gist. 
     *  Will need to change	viewerLinkListHtml to something else (ie - publishedLinkListHtml)
     * 
        var viewerLinkListHtml = _.reduce(fileDesc.publishLocations, function(result, attributes) {
			var params = sharing.getViewerParams(attributes);
			if(params) {
				var link = constants.BASE_URL + 'viewer#!' + $.param(params);
				result += _.template(dialogManageSharingLocationHTML, {
					link: link
				});
			}
			return result;
		}, '');
		shareViewerListElt.innerHTML = viewerLinkListHtml;
		$msgNoShareViewerElt.toggleClass('hide', viewerLinkListHtml.length !== 0);
    *
    */
    };

	dialogManageSharing.onFileSelected = function(fileDescParameter) {
		fileDesc = fileDescParameter;
		refreshDocumentSharing(fileDescParameter);
	};

	dialogManageSharing.onSyncExportSuccess = refreshDocumentSharing;
	dialogManageSharing.onSyncRemoved = refreshDocumentSharing;
	dialogManageSharing.onNewPublishSuccess = refreshDocumentSharing;
	dialogManageSharing.onPublishRemoved = refreshDocumentSharing;

	dialogManageSharing.onReady = function() {
		var modalElt = document.querySelector('.modal-manage-sharing');
		shareEditorListElt = modalElt.querySelector('.share-editor-list');
		shareViewerListElt = modalElt.querySelector('.share-viewer-list');
		$msgNoShareEditorElt = $(modalElt.querySelectorAll('.msg-no-share-editor'));
		$msgNoShareViewerElt = $(modalElt.querySelectorAll('.msg-no-share-viewer'));
		$(modalElt).on('show.bs.modal', function() {
			$(modalElt.querySelector('input')).each(function() {
				this.value = $(this).data('value');
			});
		});
	};

	return dialogManageSharing;

});