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

var dialogOK = function() {
	var t = $('#checkbox-1').is(':checked');
	if (t === true) {
		localStorage.info = "true";
	}

	$('#info').popup({history : false});
	$('#info').popup('close');

	// Start Camera after dialog has been closed.
	cameraApp.run();
};

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
