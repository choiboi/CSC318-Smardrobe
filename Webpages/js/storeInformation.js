// 
// This function retrieves all the associated tags of the specified
// clothing.
//
// @param clothingFilename - filename of the clothing.
// @return an array of tags.
//
var retrieveClothingTags = function(clothingFilename) {
    var tagsArray = jQuery.parseJSON(localStorage[storageKeys.tags]);
    return tagsArray.clothingFilename;
};

//
// This function adds new tags into our database.
//
// @param tag - Either an array of tags or single tag string.
//
var addNewTag = function(tag) {
    var tagsLocal = jQuery.parseJSON(localStorage[storageKeys.tags]);

    // If tag was a string.
    if (typeof tag === "string") {
        if (typeof tagsLocal[tag] === "undefined") {
            tagsLocal[tag] = new Array();
        }
    // If tag is an array of tags.
    } else if (tag instanceof Array) {
        for (var ind = 0; ind < tag.length; ind++) {
            if (typeof tagsLocal[tag[ind]] === "undefined") {
                tagsLocal[tag[ind]] = new Array();
            }
        }
    }
    
    localStorage[storageKeys.tags] = JSON.stringify(tagsLocal);
};

//
// This function adds new clothes filenames into our database.
//
// @param clothesFilename - Either an array of clothes filenames or single 
//                          filename string.
//
var addNewClothes = function(clothesFilename) {
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);

    // If clothesFilename is a string.
    if (typeof clothesFilename === "string") {
        if (typeof clothesLocal[clothesFilename] === "undefined") {
            clothesLocal[clothesFilename] = new Array();
        }
    // If clothesFilename is a list of clothes filenames.
    } else if (clothesFilename instanceof Array) {
        for (var ind = 0; ind < clothesFilename.length; ind++) {
            if (typeof clothesLocal[clothesFilename[ind]] === "undefined") {
                clothesLocal[clothesFilename[ind]] = new Array();
            }
        }
    }

    localStorage[storageKeys.clothes] = JSON.stringify(clothesLocal);
};


$(document).ready(function() {
    storageKeys = new StorageKeys();
    localStorage.clear();

    //Initiate storage on first app start.
    if (typeof localStorage[storageKeys.tags] === "undefined") {
        localStorage[storageKeys.tags] = JSON.stringify({});
    } 
    if (typeof localStorage[storageKeys.clothes] === "undefined") {
        localStorage[storageKeys.clothes] = JSON.stringify({});
    }
    if (typeof localStorage[storageKeys.favs] === "undefined") {
        localStorage[storageKeys.favs] = JSON.stringify({});
    }

    // addNewTag('tag');
    // addNewTag('tag2');
    // addNewTag(['ui', 'op']);
    // addNewTag(new Array('hj', 'kl'));

    // addNewClothes('test1');
    // addNewClothes('test');
    // addNewClothes(['as', 'df']);
    // addNewClothes(new Array('qw', 'rt'));
});

function StorageKeys() {
    this.tags = "tags";
    this.clothes = "clothes";
    this.favs = "favs";
}
var storageKeys;