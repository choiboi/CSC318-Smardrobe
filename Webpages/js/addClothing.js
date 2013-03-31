var initialize = function() {
	//startCameraInfo();

	if (typeof localStorage.info === "undefined") {
		localStorage.info = false;
		$('#info').popup('open');
	} else if (localStorage.info === "false") {
		$('#info').popup('open');
	}
}

// var startCameraInfo = function() {
// 	navigator.camera.getPicture(this.cameraSuccess, this.cameraError);
// };

// var cameraSuccess = function(imgData) {

// };

// var cameraError = function(msg) {
// 	alert("Camera Failed: " + msg);
// };

$(document).ready(initialize);