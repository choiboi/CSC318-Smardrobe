var pageNumber = 0;
var filterOptions = [];
var selectedImage;
var images = [];
var displayLimit;

(function(window, $, PhotoSwipe)
		{
			$(document).ready(function()
			{
				$("#gallery a").photoSwipe(
				{
					enableMouseWheel: false,
					enableKeyboard: false
				});
			});
		}(window, window.jQuery, window.Code.PhotoSwipe));



function initializer(filterOps, image, disLimit) {
    displayLimit = disLimit;
    selectedImage = image;
    filterOptions = filterOps;
    
    for (var i = 0; i < filterOps.length; i++) { 
        
    }
    
    for (i = imageRange[0]; i < imageRange[1]; i++) { 
        
    }
    
    imageListDisplay();
}

function imageListDisplay () {
    var gridContents = "";
    var letter = "a";
    
    for (var i = pageNumber * displayLimit; i < (pageNumber + 1) * displayLimit - 1; i++) { 
        if (i % 3 == 0) {
            letter = "a";
        } else if (i % 3 == 0) {
            letter = "b";
        } else {
            letter = "c";
        }
        
        var div = document.createElement("div");
        var image = document.createElement("img");
        
        image.src = "data:image/jpeg;base64," + images[i];
        image.onclick = "zoomIn(" + images[i] + ")";
        
        div.setAttribute('class', "ui-block-" + letter);
        div.appendChild(image);
        document.getElementById("grid").appendChild(div);
        //gridContents += '<div class="ui-block-' + letter + '"><img src="images/' + images[i] + '" alt="Clothing image" onclick="zoomIn(' + images[i] + ')"></div>';
    }
}

function writeString (string) {

    //document.getElementById("grid").appendChild(string);
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