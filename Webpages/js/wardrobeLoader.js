var pageNumber = 0;
var filterOptions = [];
var selectedImage;
var images = [];
displayLimit;

function initializer(filterOps, image, disLimit) {
    displayLimit = disLimit;
    selectedImage = image;
    
    for (var i = 0; i < filterOps.length; i++) { 
        
    }
    
    for (i = imageRange[0]; i < imageRange[1]; i++) { 
        
    }
    
    imageListDisplay();
}

function imageListDisplay () {
    var gridContents = "";
    
    for (var i = pageNumber * displayLimit; i < (pageNumber + 1) * displayLimit - 1; i++) { 
        gridContents += '<div class="ui-block-c"><img src="images/' + images[i] + '" alt="Clothing image" onclick="zoomIn(' + images[i] + ')"></div>';
    }
}

function writeString (string) {

    document.write(string);
}

function zoomIn(imageName) {
    var backButton = document.getElementById("backButton");
    backButton.href = "";
    backButton.onclick = "loadBack()";
  
    var footer = document.getElementById("footer");
    footer.appendChild('<div><a href="#edit" data-role="button">Edit</a>');
}

function loadBack() {
    
}