var pageNumber = 0;
var filterOptions = [];
var selectedImage;
var images = [];

function initializer(filterOps, image, imageRange) {

    
    selectedImage = image;
    for (var i = 0; i < filterOps.length; i++) { 
        
    }
    
    for (i = imageRange[0]; i < imageRange[1]; i++) { 
        
    }
    
}

function imageListDisplay (images) {
    for (var i = 0; i < images.length; i++) { 
        writeImage(images[i]);
    }
}

function writeImage (imageName) {
    document.write('<img src="images/' + imageName + '" alt="Clothing image" onclick="zoomIn(' + imageName + ')">');
}

function zoomIn(imageName) {
    var backButton = document.getElementById("backButton");
    backButton.href="wardrobe.html"
    backButton.onclick="loadBack()";
  
}

function loadBack() {
    
}