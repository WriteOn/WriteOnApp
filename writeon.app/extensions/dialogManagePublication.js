define([
	"jquery",
	"underscore",
	"classes/Extension",
	"text!html/dialogManagePublicationLocation.html",
], function($, _, Extension, dialogManagePublicationLocationHTML) {

	var dialogManagePublication = new Extension("dialogManagePublication", 'Manage Publications', false, true);

	var eventMgr;
	dialogManagePublication.onEventMgrCreated = function(eventMgrParameter) {
		eventMgr = eventMgrParameter;
	};

	var fileDesc;
	var publishListElt;
	var $showAlreadyPublishedElt;
	var refreshDialog = function(fileDescParameter) {
		if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
			return;
		}

		$showAlreadyPublishedElt.toggleClass("hide", _.size(fileDesc.publishLocations) === 0);

		var publishListHtml = _.reduce(fileDesc.publishLocations, function(result, publishAttributes) {
			var formattedAttributes = _.omit(publishAttributes, "provider", "publishIndex");
			formattedAttributes.password && (formattedAttributes.password = "********");
			formattedAttributes = JSON.stringify(formattedAttributes).replace(/{|}|"/g, "").replace(/,/g, ", ");
			return result + _.template(dialogManagePublicationLocationHTML, {
				publishAttributes: publishAttributes,
				publishDesc: formattedAttributes,
				publishLocationLink: publishAttributes.provider.getPublishLocationLink && publishAttributes.provider.getPublishLocationLink(publishAttributes)
			});
		}, '');

		publishListElt.innerHTML = publishListHtml;
	};

	dialogManagePublication.onFileSelected = function(fileDescParameter) {
		fileDesc = fileDescParameter;
		refreshDialog(fileDescParameter);
	};

	dialogManagePublication.onNewPublishSuccess = refreshDialog;
	dialogManagePublication.onPublishRemoved = refreshDialog;

	dialogManagePublication.onReady = function() {
		var modalElt = document.querySelector(".modal-manage-publish");
		publishListElt = modalElt.querySelector(".publish-list");

		$showAlreadyPublishedElt = $(document.querySelectorAll(".show-already-published"));

		/*
		$(publishListElt).on('click', '.remove-button', function(e) {
			//var $removeButtonElt = $(this);
			e.preventDefault();
    		$("#confirmPubDelete").modal('show');
		});
		*/
		
		$("#confirmPubDelete").on('show.bs.modal', function(event) {    // wire up the OK button to dismiss the modal when shown
			$(".confirm-delete-button").on("click", function(e) {
				var $removeButtonElt = $(event.relatedTarget);
				var publishAttributes = fileDesc.publishLocations[$removeButtonElt.data('publishIndex')];
				fileDesc.removePublishLocation(publishAttributes);
				eventMgr.onPublishRemoved(fileDesc, publishAttributes);
            	$("#confirmPubDelete").modal('hide');     // dismiss the dialog
        	});
    	});
	
	
	};

	return dialogManagePublication;
});
