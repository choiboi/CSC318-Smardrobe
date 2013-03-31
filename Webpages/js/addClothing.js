//$(document).ready(initialize);
document.addEventListener("deviceready", initialize, false);

var initialize = function() {
	//startCameraInfo();
	cameraApp = new cameraApp();
    cameraApp.run();

	if (typeof localStorage.info === "undefined") {
		localStorage.info = "false";
		$('#info').popup('open');
	} else if (localStorage.info === "false") {
		$('#info').popup('open');
	}
};

var dialogOK = function() {
	var t = $('#checkbox-1').is(':checked');
	if (t === true) {
		localStorage.info = "true";
	}

	$('#info').popup({history : false});
	$('#info').popup('close');
};

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
            quality: 50,
            destinationType: that._destinationType.DATA_URL
        });
    },
    
    _onPhotoDataSuccess: function(imageData) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
    
        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageData;
    },

    _onFail: function(message) {
        alert('Failed! Error: ' + message);
    }
};
