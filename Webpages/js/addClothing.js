//
// This function is invoked once it enters add clothing page.
//
var initialize = function() {
	cameraApp = new cameraApp();

	if (typeof localStorage.info === "undefined") {
		localStorage.info = "false";
		$('#info').popup('open');
	} else if (localStorage.info === "false") {
		$('#info').popup('open');
	} else {
    	cameraApp.run();
	}
};

//
// Closes the popup with information on taking pictures.
//
var dialogOK = function() {
	var t = $('#checkbox-1a').is(':checked');
	if (t === true) {
		localStorage.info = "true";
	}

	$('#info').popup({history : false});
	$('#info').popup('close');

	// Start Camera after dialog has been closed.
	cameraApp.run();
};

//
// When retake button is pressed, startup camera again.
//
$('#retakeBut').click(function() {
	cameraApp.run();
});

//
// Once confirm button is pressed, get the user's selections
// and store info. If the user has not selected anything, then
// open a popup alerting the user.
//
$('#propConfirm').click(function() {
	s1 = new Array();
	if ($('#checkbox-1b').is(':checked') === true) {
		s1 = s1.concat(new Array('casual'));
	}
	if ($('#checkbox-2b').is(':checked') === true) {
		s1 = s1.concat(new Array('formal'));
	}

	if (s1.length === 0) {
		$('#notEnoughInfo').popup('open');
	} else {
		var wearType = $('input[name="radio-choice"]:checked').val();

		//TODOs: Store These property values.

		window.location = "smardrobe.html";
	}
});

//
// Close button for properties page.
//
$('#propCancel').click(function() {
	$('#cancelInfo').popup('open');
});

//
// Close cancel confirmation popup and return back to main screen.
//
$('#cancelYES').click(function() {
	$('#cancelInfo').popup({history : false});
	$('#cancelInfo').popup('close');
	window.location = "smardrobe.html";
});

//
// Close cancel confirmation popup. 
//
$('#cancelNO').click(function() {
	$('#cancelInfo').popup({history : false});
	$('#cancelInfo').popup('close');
});

//
// Close the missing information popup.
//
$('#notEnoughOK').click(function() {
	$('#notEnoughInfo').popup({history : false});
	$('#notEnoughInfo').popup('close');
});

//
// Resize image to fit on the preview screen.
//
var resizeImg = function() {
	var headerH = $.mobile.activePage.children('[data-role="header"]'),
		footerH = $.mobile.activePage.children('[data-role="footer"]'),
		contentH = $.mobile.activePage.children('[data-role="content"]'),
		windowH = $(this).height(),
		windowW = $(this).width();

	alert(headerH + ", " + footerH + ", " + contentH + ", " + windowH + ", " + windowW);
};

document.addEventListener("deviceready", initialize, false);
var cameraApp;


//
// Class for initiating the camera.
//
function cameraApp(){}
cameraApp.prototype={
    _pictureSource: null,
    
    _destinationType: null,
    
    run: function(){
        var that=this;
	    that._pictureSource = navigator.camera.PictureSourceType;
	    that._destinationType = navigator.camera.DestinationType;
        that._capturePhoto.apply(that,arguments);
    },
    
    _capturePhoto: function() {
        var that = this;
        
        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        },function(){
            that._onFail.apply(that,arguments);
        },{
            quality: 80,
            destinationType: that._destinationType.DATA_URL,
            targetWidth: 400,
            targetHeight: 640,
            encodingType: Camera.EncodingType.PNG,
            correctOrientation: true
        });
    },
    
    _onPhotoDataSuccess: function(imageData) {
    	window.location = "addClothing.html#preview";
        // var imgPreview = document.getElementById('clothingImg');
        // imgPreview.style.display = 'block';
    
        // Show the captured photo.
        // imgPreview.src = "data:image/png;base64," + imageData;
    },

    _onFail: function(message) {
        alert('Failed! Error: ' + message);
    }
};
