var pageNumber = 0;
var maxPages = 0;
var filterOptions = [];
var selectedImage;
var multiSelect = false;
var multiClothes = [];
var images = [];
var displayLimit = 6;
var x_start;
var clothingNames = [];

$(document).ready(function() {
    $('#mainBody').on('swipeleft', function() {
        loadNextPage();
    });
    $('#mainBody').on('swiperight', function() {
        loadPreviousPage();
    });
    
    initializer(0, 6);
});


function touchStart(e) {
    var touch = e.touches[0];
    x_start = touch.pageX;
}

function touchEnd(e) {
    var touch = e.touches[0];
    if (x_start - touch.pageX > 50) {
        loadPreviousPage();
    } else if (x_start - touch.pageX < -50) {
        loadNextPage();
    }
}

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

var getClothingSuccess = function(clothing) {
    images.push(clothing);
}

var deleteFunction = function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    
    if (multiSelect) {
        multiClothes.sort(function(a,b){
            return a-b
        });
        for (var i = 0; i < multiClothes.length; i++) {
            deleteClothing(clothingNames[multiClothes[i] - i]);
            deleteClothingDB(clothingNames[multiClothes[i] - i]);
            clothingNames.splice(multiClothes[i] - i, 1);
        }
        
        if (multiClothes.length > 0) {
            for (i = 0; i < maxPages; i++) {
                $("#grid" + i).remove();
            }
            
            var counter = 0;
            var hasNext;

            if (clothingNames.length > 0) {
                hasNext = true;
            } else {
                hasNext = false;
            }

            while (hasNext) {
                $("#body" + counter).append('<div class="ui-grid-b" id="grid' + counter + '"></div>');
                hasNext = imageListDisplay(counter);
                counter += 1;
            }
            
            getClothingDB(clothingNames[0], function(clothing) {
                //alert(clothing);
                $('#' + 0).attr('src', clothing);
                recursiveAdd(1);
                
            });
    
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
        clothingNames.splice(selectedImage, 1);
        
        for (i = pageNumber; i < maxPages; i++) {
            $("#grid" + i).remove();
        }
            
        counter = pageNumber;

        if (clothingNames.length > (counter + 1) * displayLimit) {
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
        
        getClothingDB(clothingNames[pageNumber * displayLimit], function(clothing) {
            //alert(clothing);
            $('#' + 0).attr('src', clothing);
            recursiveAdd(pageNumber * displayLimit + 1);
                
        });
        
        if (pageNumber > maxPages - 1) {
            pageNumber = maxPages - 1;
        }
        $.mobile.changePage($("#page" + pageNumber), {
            transition: "slide", 
            reverse: false
        });
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
    
    for (var i = 0; i < multiClothes.length; i++) {
        $("#" + multiClothes[i]).css("opacity", 1);
    }
    
    multiClothes = [];
    
    $(".multiSelect").bind('tap', function(event) {
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
        
    $(".multiSelect").remove();
    $(".footer").append('<a href="#" data-role="button" id="delete" rel="external" >Delete</a>');
    $(".footer").append('<a href="#" data-role="button" id="cancel" rel="external" >Cancel</a>');
    $("#delete").bind('click tap', function(event) {
        deleteFunction(event);
    });
    $("#cancel").bind('click tap', function(event) {
        cancelFunction(event);
    });
    
    multiSelect = true;
    $(".footer").trigger("create");
    return false;
}

function initializer(image, disLimit) {
    displayLimit = disLimit;
    selectedImage = image;
    
    if (image != 0) {
        filterOptions = retrieveTagsByClothing(image);
    }
    if (filterOptions.length > 0) {
        for (var i = 0; i < filterOptions.length; i++) {
            clothingNames = clothingNames.concat(retrieveClothingByTag(filterOptions[i]));
        }
    } else if (image == 0) {
        clothingNames = listClothes();
    } 
    
    
    
    /*
    for (i = 0; i < clothingNames.length; i++) {
        //alert(clothingNames[i]);
        getClothingDB(clothingNames[i], function(clothing) {
            //alert(clothing);
            images[i] = clothing;
        });
    }
    */
    
    var counter = 0;
    var hasNext;
    
    if (clothingNames.length > 0) {
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
    
    $(".header").append("<a href=''' data-role='button' id='backButton' class='backButton' >Back</a>");
    $(".header").append('<h4>Wardrobe</h4>');
    $(".header").append('<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" class="ui-btn-right">Filter</a>');
    $(".footer").append('<a href="#" data-role="button" id="multiSelect" class="multiSelect">Multi Select</a>');
    
    $(".backButton").bind('tap click', function(event) {
        window.location = "smardrobe.html";
        /*
        $.mobile.changePage($("#smardrobe"), {
            transition: "slide", 
            reverse: false
        });
        for (i = 0; i < maxPages; i++) {
            $("#page" + i).remove();
        }
        $("#smardrobe").trigger('create');
        */
    });
    
    getClothingDB(clothingNames[0], function(clothing) {
        //alert(clothing);
        $('#' + 0).attr('src', clothing);
        recursiveAdd(1);
                
    });
            
    $(".multiSelect").bind('tap click', function(event) {
        return multiSelectFunction(event);
    });
    
    $(".image").bind('tap click', function(event) {
        imageSelectFunction(event);
    });
    
    //$("#page0").trigger("create");
    
    //creating the image page for zoomed in images
    $("#mainBody").append('<div data-role="page" id="pageImage" data-theme="a"></div>');
    $("#pageImage").append('<div data-role="header" data-theme="a" data-id="wardrobeHeader" data-position="fixed" id="imageHeader"></div>');
    $("#imageHeader").append("<a href=''' data-role='button' id='imageBackButton'>Back</a>");
    $("#imageHeader").append('<h4>Clothing</h4>');
    $("#pageImage").append('<div data-role="content" id="bodyImage"></div>');
    $("#bodyImage").append('<div class="ui-grid-solo" id="gridImage"></div>');
    $("#pageImage").append('<div data-role="footer" data-position="fixed" data-theme="a" id="imageFooter"></div>');
    $("#imageFooter").append('<a href="#" data-role="button" id="imageDelete">Delete</a>');
    $("#gridImage").append('<div class="ui-block-a"><img src="" id="zoomedImage"></div>');
    
    $("#imageBackButton").bind('tap click', function(event) {
        $.mobile.changePage($("#page" + pageNumber), {
            transition: "slide", 
            reverse: false
        });
    });
    
    $("#imageDelete").bind('tap click', function(event) {
        deleteFunction(event);
    });
    

}

function recursiveAdd(i) {
    if (i >= clothingNames.length) {
        $.mobile.changePage($("#page" + "0"), {
            transition: "slide", 
            reverse: false
        });
        return;
    }
    getClothingDB(clothingNames[i], function(clothing) {
        //alert(clothing);
        $('#' + i).attr('src', clothing);
        recursiveAdd(i + 1);
    });
}

function imageListDisplay (counter) {
    var gridContents = "";
    var letter = "a";

    for (var i = counter * displayLimit; i < (counter + 1) * displayLimit; i++) {
        if (i < clothingNames.length) {
            if (i % 3 == 0) {
                letter = "a";
            } else if (i % 3 == 1) {
                letter = "b";
            } else {
                letter = "c";
            }

            var div = document.createElement("div");
            var image = document.createElement("img");

            image.src = "";
            
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
    getClothingDB(clothingNames[imageNumber], function(clothing) {
        //alert(clothing);
        $('#zoomedImage').attr("src", clothing);
        $.mobile.changePage($("#pageImage"), {
            transition: "slide", 
            reverse: false
        });    
    });
    
}

function loadBack() {

}