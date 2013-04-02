var pageNumber = 0;
var maxPages = 0;
var filterOptions = [];
var selectedImage;
var multiSelect = false;
var multiClothes = [];
var images = [];
var displayLimit = 3;
var x_start;
var clothingNames = [];

$(document).ready(function() {
    $('#mainBody').on('swipeleft', function() {
        loadNextPage();
    });
    $('#mainBody').on('swiperight', function() {
        loadPreviousPage();
    });
    
    initializer(0, 3);
});

function loadPreviousPage() {
    if (pageNumber > 0) {
        pageNumber -= 1;
        $.mobile.changePage($("#page" + pageNumber), {
            transition: "slide", 
            reverse: true
        });
    }
}

function loadNextPage() {
    if (pageNumber < maxPages) {
        pageNumber += 1;
        $.mobile.changePage($("#page" + pageNumber), {
            transition: "slide", 
            reverse: false
        });
    }
}

var deleteFunction = function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    
    if (multiSelect) {
        multiClothes.sort(function(a,b){return a-b});
        for (var i = 0; i < multiClothes.length; i++) {
            deleteClothing(clothingNames[multiClothes[i] - i]);
            deleteClothingDB(clothingNames[multiClothes[i] - i]);
            images.splice(multiClothes[i] - i, 1);
            clothingNames.splice(multiClothes[i] - i, 1);
        }
        
        if (multiClothes.length > 0) {
            for (i = 0; i < maxPages; i++) {
                $("#grid" + i).remove();
            }
            
            var counter = 0;
            var hasNext;

            if (images.length > 0) {
                hasNext = true;
            } else {
                hasNext = false;
            }

            while (hasNext) {
                $("#body" + counter).append('<div class="ui-grid-b" id="grid' + counter + '"></div>');
                hasNext = imageListDisplay(counter);
                counter += 1;
            }
            
            maxPages = counter;
            
            if (pageNumber > maxPages - 1) {
                pageNumber = maxPages - 1;
                $.mobile.changePage($("#page" + pageNumber), {
                    transition: "slide", 
                    reverse: false
                });
            }
        }
    } else {
        deleteClothing(clothingNames[selectedImage]);
        deleteClothingDB(clothingNames[selectedImage]);
        images.splice(selectedImage, 1);
        clothingNames.splice(selectedImage, 1);
        
        for (i = pageNumber; i < maxPages; i++) {
            $("#grid" + i).remove();
        }
            
        counter = pageNumber;

        if (images.length > (counter + 1) * displayLimit) {
            hasNext = true;
        } else {
            hasNext = false;
        }

        while (hasNext) {
            $("#body" + counter).append('<div class="ui-grid-b" id="grid' + counter + '"></div>');
            hasNext = imageListDisplay(counter);
            counter += 1;
        }
            
        maxPages = counter;
        
        if (pageNumber > maxPages - 1) {
            pageNumber = maxPages - 1;
            $.mobile.changePage($("#page" + pageNumber), {
                transition: "slide", 
                reverse: false
            });
        }
    }
}

//done
var cancelFunction = function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    
    multiSelect = false;
    $("#delete").remove();
    $("#cancel").remove();
    $(".footer").append('<a href="#" data-role="button" id="multiSelect" rel="external" onclick="multiSelectFuntion(); return false">Multi Select</a>');
    
    $("#multiSelect").bind('tap', function(event) {
        multiSelectFunction(event);
    });
    
    $(".footer").trigger("create");
}

var imageSelectFunction = function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    
    selectedImage = Number(event.currentTarget.id);
    if (multiSelect) {
        var position = multiClothes.indexOf(Number(event.currentTarget.id));
        if (position != -1) {
            multiClothes.splice(position, 1);
            $("#" + event.currentTarget.id).css("opacity", 1);
        } else {
            multiClothes.push(Number(event.currentTarget.id));
            $("#" + event.currentTarget.id).css("opacity", 0.5);
        }
        
    } else {
        zoomIn(Number(event.currentTarget.id));
    }
    
}

var multiSelectFunction = function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
        
    $("#multiSelect").remove();
    $(".footer").append('<a href="#" data-role="button" id="delete" rel="external" >Delete</a>');
    $(".footer").append('<a href="#" data-role="button" id="cancel" rel="external" >Cancel</a>');
    $("#delete").bind('tap', function(event) {
        deleteFunction(event);
    });
    $("#cancel").bind('tap', function(event) {
        cancelFunction(event);
    });
    
    multiSelect = true;
    $(".footer").trigger("create");
    return false;
}

function initializer(image, disLimit) {
    displayLimit = disLimit;
    selectedImage = image;
    filterOptions = ["shoe"];
    images[0] = ClothesData.coat1;
    images[1] = ClothesData.coat2;
    images[2] = ClothesData.coat3;
    images[3] = ClothesData.coat4;
    
/*
    for (var i = 0; i < filterOptions.length; i++) {
        clothingNames = clothingNames.concat(retrieveClothingByTag(filterOptions[i]));
    }
    
    
    for (i = 0; i < clothingNames.length; i++) {
        
        getClothingDB(clothingNames[i], function(clothing) {
            images.push(clothing);
        });
    }
*/
    
    var counter = 0;
    var hasNext;
    
    if (images.length > 0) {
        hasNext = true;
    } else {
        hasNext = false;
    }

    while (hasNext) {
            $("#mainBody").append('<div data-role="page" id="page' + counter + '" data-theme="a"></div>');
            $("#page" + counter).append('<div data-role="header" data-theme="a" data-id="wardrobeHeader" data-position="fixed" class="header"></div>');
            $("#page" + counter).append('<div data-role="content" id="body' + counter + '"></div>');
            $("#body" + counter).append('<div class="ui-grid-b" id="grid' + counter + '"></div>');
            $("#page" + counter).append('<div data-role="footer" data-position="fixed" data-theme="a" class="footer"></div>');
        
        
        hasNext = imageListDisplay(counter);
        counter += 1;
    }
    
    maxPages = counter;
    
    $(".header").append("<a href=''' data-role='button' id='backButton' class='ui-btn-left' >Back</a>");
    $(".header").append('<h4>Wardrobe</h4>');
    $(".header").append('<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" class="ui-btn-right">Filter</a>');
    $(".footer").append('<a href="#" data-role="button" id="multiSelect">Multi Select</a>');
    
    $("#backButton").bind('tap click', function(event) {
        window.location = "smardrobe.html";
    });
    
    $("#multiSelect").bind('tap click', function(event) {
        return multiSelectFunction(event);
    });
    
    $(".image").bind('tap click', function(event) {
        imageSelectFunction(event);
    });
    
    //$("#page0").trigger("create");
    
    //creating the image page for zoomed in images
    $("#mainBody").append('<div data-role="page" id="pageImage" data-theme="a"></div>');
    $("#pageImage").append('<div data-role="header" data-theme="a" data-id="wardrobeHeader" data-position="fixed" id="imageHeader" data-add-back-btn="true"></div>');
    $("#pageImage").append('<div data-role="content" id="bodyImage"></div>');
    $("#bodyImage").append('<div class="ui-grid-solo" id="gridImage"></div>');
    $("#pageImage").append('<div data-role="footer" data-position="fixed" data-theme="a" id="imageFooter"></div>');
    $("#imageFooter").append('<a href="#" data-role="button" id="imageDelete">Delete</a>');
    
    $("#imageDelete").bind('tap', function(event) {
        deleteFunction(event);
    });
    
}

function imageListDisplay (counter) {
    var gridContents = "";
    var letter = "a";

    for (var i = counter * displayLimit; i < (counter + 1) * displayLimit; i++) {
        if (i < images.length) {
            if (i % 3 == 0) {
                letter = "a";
            } else if (i % 3 == 1) {
                letter = "b";
            } else {
                letter = "c";
            }

            var div = document.createElement("div");
            var image = document.createElement("img");

            image.src = "" + images[i];
            //image.setAttribute('onclick', "zoomIn(" + i + ")");
            image.setAttribute('class', "image");
            image.setAttribute('id', "" + i);
            
            div.setAttribute('class', "ui-block-" + letter);
            div.appendChild(image);
            
            $("#grid" + counter).append(div);
        //gridContents += '<div class="ui-block-' + letter + '"><img src="images/' + images[i] + '" alt="Clothing image" onclick="zoomIn(' + images[i] + ')"></div>';
        } else {
            return false;
        }

    }

    return true;
}

function writeString (string) {

//document.getElementById("grid").appendChild(string);
}

function zoomIn(imageNumber) {
    var image = document.createElement("img");

    image.src = "" + images[imageNumber];
    $("#gridImage").append(image)
    $.mobile.changePage($("#page" + pageNumber), {
            transition: "slide", 
            reverse: false
        });
}

function loadBack() {

}