var pageNumber = 0;
var maxPages = 0;
var filterOptions = [];
var selectedImage;
var multiSelect = false;
var multiClothes = [];
var images = [];
var displayLimit = 3;
var x_start;
var favouriteNames = [];
var favouriteOutfits = [];

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
        multiClothes.sort(function(a,b){
            return a-b
            });
        for (var i = 0; i < multiClothes.length; i++) {
            deleteFavourite(favouriteNames[multiClothes[i] - i]);
            favouriteNames.splice(multiClothes[i] - i, 1);
            favouriteOutfits.splice(selectedImage, 1);
        }
        
        if (multiClothes.length > 0) {
            for (i = 0; i < maxPages; i++) {
                $("#grid" + i).remove();
            }
            
            var counter = 0;
            var hasNext;

            if (favouriteNames.length > 0) {
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
            
            getClothingDB(favouriteOutfits[0][0], function(clothing) {
                //alert(clothing);
                $('#image' + 0).attr('src', clothing);
                recursiveAdd(1);
                
            });
            
        }
    } else {
        deleteFavourite(favouriteNames[selectedImage]);
        favouriteNames.splice(selectedImage, 1);
        favouriteOutfits.splice(selectedImage, 1);
        
        for (i = pageNumber; i < maxPages; i++) {
            $("#grid" + i).remove();
        }
            
        counter = pageNumber;

        if (favouriteNames.length > (counter + 1) * displayLimit) {
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
            
        }
        
        getClothingDB(favouriteOutfits[0][0], function(clothing) {
            //alert(clothing);
            $('#image' + 0).attr('src', clothing);
            recursiveAdd(1);
                
        });
            
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
    
    $(".multiSelect").bind('tap click', function(event) {
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
    
    $("#delete").bind('tap click', function(event) {
        deleteFunction(event);
    });
    $("#cancel").bind('tap click', function(event) {
        cancelFunction(event);
    });
    
    multiSelect = true;
    $(".footer").trigger("create");
    return false;
}

function initializer(image, disLimit) {
    displayLimit = disLimit;
    selectedImage = image;
    
    var clothesTop;
    var clothesBottom;
    var clothesShoe;

    var topCategories = ['outerwear', 'tshirt'];
    var bottomCategories = ['pant'];
    var shoeCategories = ['shoe'];

    clothesTop = new Array();

    for (var i = 0; i < topCategories.length; i++) {
        clothesTop = clothesTop.concat(retrieveClothingByTag(topCategories[i]));
    }

    clothesBottom = new Array();

    for (i = 0; i < bottomCategories.length; i++) {
        clothesBottom = clothesBottom.concat(retrieveClothingByTag(bottomCategories[i]));
    }

    clothesShoe = new Array();

    for (i = 0; i < shoeCategories.length; i++) {
        clothesShoe = clothesShoe.concat(retrieveClothingByTag(shoeCategories[i]));
    }
    
    
    favouriteOutfits = [[clothesTop[0], clothesBottom[0], clothesShoe[0]],[clothesTop[1], clothesBottom[1], clothesShoe[2]],[clothesTop[0], clothesBottom[2], clothesShoe[4]],[clothesTop[4], clothesBottom[3], clothesShoe[2]]];
    favouriteNames = [0, 1, 2, 3];
    //favouriteOutfits = result[1];
    
    if (favouriteNames.length < 1) {
    
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
        $(".multiSelect").bind('tap click', function(event) {
            return multiSelectFunction(event);
        });
        return;
    }
    /*
    for (i = 0; i < favouriteNames.length; i++) {
        //alert(favouriteNames[i]);
        getClothingDB(favouriteNames[i], function(clothing) {
            //alert(clothing);
            images[i] = clothing;
        });
    }
    */
    
    var counter = 0;
    var hasNext;
    
    if (favouriteNames.length > 0) {
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
    
    $(".header").append("<a href='' data-role='button' id='backButton' class='backButton' >Back</a>");
    $(".header").append('<h4>Favourites</h4>');
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
    
    getClothingDB(favouriteOutfits[0][0], function(clothing) {
        //alert(clothing);
        $('#image' + 0).attr('src', clothing);
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
    

}

function recursiveAdd(i) {
    if (i >= favouriteNames.length * 3) {
        $.mobile.changePage($("#page" + pageNumber), {
            transition: "slide", 
            reverse: false
        });
        return;
    }
    
    getClothingDB(favouriteOutfits[Math.floor(i / 3)][i % 3], function(clothing) {
        //alert(clothing);
        $('#image' + i).attr('src', clothing);
        recursiveAdd(i + 1);
    });
}

function imageListDisplay (counter) {
    var gridContents = "";
    var letter = "a";

    for (var i = counter * displayLimit; i < (counter + 1) * displayLimit; i++) {
        if (i < favouriteNames.length) {
            if (i % 3 == 0) {
                letter = "a";
            } else if (i % 3 == 1) {
                letter = "b";
            } else {
                letter = "c";
            }

            var div = document.createElement("div");
            var childGrid = document.createElement("div");
            var imageGridTop = document.createElement("div");
            var imageGridBottom = document.createElement("div");
            var imageGridShoes = document.createElement("div");
            
            childGrid.setAttribute('class', "ui-grid-solo");
            childGrid.setAttribute('id', counter);
            
            imageGridTop.setAttribute('class', "ui-block-a");
            imageGridBottom.setAttribute('class', "ui-block-a");
            imageGridShoes.setAttribute('class', "ui-block-a");
            
            var imageTop = document.createElement("img");
            var imageBottom = document.createElement("img");
            var imageShoes = document.createElement("img");

            imageTop.src = "";
            imageBottom.src = "";
            imageShoes.src = "";
            
            imageTop.setAttribute('class', "imageTop");
            imageBottom.setAttribute('class', "imageBottom");
            imageShoes.setAttribute('class', "imageShoe");
            
            imageTop.setAttribute('id', "image" + (i * 3));
            imageBottom.setAttribute('id', "image" + ((i * 3) + 1));
            imageShoes.setAttribute('id', "image" + ((i * 3) + 2));
            
            div.setAttribute('class', "ui-block-" + letter);
            
            imageGridTop.appendChild(imageTop);
            imageGridBottom.appendChild(imageBottom);
            imageGridShoes.appendChild(imageShoes);
            
            childGrid.appendChild(imageGridTop);
            childGrid.appendChild(imageGridBottom);
            childGrid.appendChild(imageGridShoes);
            
            div.appendChild(childGrid);
            
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
    getClothingDB(favouriteNames[imageNumber], function(clothing) {
        //alert(clothing);
        $('#zoomedImage').attr('src', clothing);
        $.mobile.changePage($("#pageImage"), {
            transition: "slide", 
            reverse: false
        });    
    });
    
}

function loadBack() {

}