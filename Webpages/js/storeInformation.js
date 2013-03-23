//
// This function adds a set of clothes, which users have
// favourited, in the database which a uniquely created
// key value.
//
// @param clothes - an array of clothes filenames.
//
var addFavorite = function(clothes) {
    var favsLocal = jQuery.parseJSON(localStorage[storageKeys.favs]);

    // Create new key that is not in the database already.
    var ID = storageKeys.makeId();
    while (typeof favsLocal[ID] !== "undefined") {
        ID = storageKeys.makeId();
    }

    favsLocal[ID] = clothes;
    localStorage[storageKeys.favs] = JSON.stringify(favsLocal);
};

//
// This function removes the specified favourite outfit using
// the provided ID value.
//
// @param ID - unique ID assigned to each favourites.
//
var deleteFavourite = function(ID) {
    var favsLocal = jQuery.parseJSON(localStorage[storageKeys.favs]);

    // Remove element with the key value ID.
    if (typeof favsLocal[ID] !== "undefined") {
        delete favsLocal[ID];
        localStorage[storageKeys.favs] = JSON.stringify(favsLocal);
    }
};

//
// This function adds new tags into our database. If the tag is already
// in the database, then it is ignored.
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
// This function adds new clothes filenames into our database. If the filename
// for the clothing is already in the database, then it is ignored.
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

//
// This function associates the given tag and clothing together.
//
// @param tag - tag name in string.
// @param clothing - clothing filename in string.
//
var associateTagClothes = function(tag, clothing) {
    // To make sure they already exist in the database.
    addNewTag(tag);
    addNewClothes(clothing);

    var tagsLocal = jQuery.parseJSON(localStorage[storageKeys.tags]);
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);

    // Add clothing filename into tags.
    var tempL = tagsLocal[tag];
    if (tempL.indexOf(clothing) === -1) {
        tempL = tempL.concat(new Array(clothing));
        tagsLocal[tag] = tempL;
        localStorage[storageKeys.tags] = JSON.stringify(tagsLocal);
    }

    // Add tag into clothing list of tags.
    var tempL = clothesLocal[clothing];
    if (tempL.indexOf(tag) === -1) {
        tempL = tempL.concat(new Array(tag));
        clothesLocal[clothing] = tempL;
        localStorage[storageKeys.clothes] = JSON.stringify(clothesLocal);
    }
};

//
// This remove the assocation between the given tag and clothing.
// NOTE: This function assumes that tag and clothing are already in
// the database.
//
// @param tag - tag name in string.
// @param clothing - clothing filename in string.
//
var removeAssociation = function(tag, clothing) {
    var tagsLocal = jQuery.parseJSON(localStorage[storageKeys.tags]);
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);

    // Remove clothing filename from tags.
    var tempL = tagsLocal[tag];
    var index = tempL.indexOf(clothing);
    if (index >= 0) {
        tempL.remove(index);
        tagsLocal[tag] = tempL;
        localStorage[storageKeys.tags] = JSON.stringify(tagsLocal);
    }

    // Remove tag from clothing list of tags.
    var tempL = clothesLocal[clothing];
    var index = tempL.indexOf(tag);
    if (index >= 0) {
        tempL.remove(index);
        clothesLocal[clothing] = tempL;
        localStorage[storageKeys.clothes] = JSON.stringify(clothesLocal);
    }
};

// 
// This function retrieves all the associated tags of the specified
// clothing.
//
// @param clothingFilename - filename of the clothing.
// @return an array of tags.
//
var retrieveTagsByClothing = function(clothingFilename) {
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);
    return clothesLocal[clothingFilename]
    ;
};

//
// This function retrieves all the associated clothes with the
// specified tag.
//
// @param tag - tag in string.
// @return an array of clothes filenames.
//
var retrieveClothingByTag = function(tag) {
    var tagsLocal = jQuery.parseJSON(localStorage[storageKeys.tags]);
    return tagsLocal[tag];
};

$(document).ready(function() {
    storageKeys = new StorageKeys();
    //localStorage.clear();

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

    // addNewClothes('pic1');
    // addNewClothes('pic2');
    // addNewClothes(['pic3', 'pic4']);
    // addNewClothes(new Array('pic5', 'pic6'));

    // associateTagClothes('tag', 'pic1');
    // associateTagClothes('ui', 'pic2');
    // associateTagClothes('randomTag', 'pic6');
    // associateTagClothes('hj', 'randomPic');
    // associateTagClothes('ui', 'pic3');

    // alert(retrieveTagsByClothing('pic2'));
    // alert(retrieveClothingByTag('ui'));

    // removeAssociation('ui', 'pic1');
    // removeAssociation('ui', 'pic2');
    // removeAssociation('hj', 'randomPic');

    // addFavorite(['c1', 'c2', 'c3']);
    // addFavorite(['a1', 'a2', 'a3']);
});

//
// This is a separate class to store keys for localStorage
// and function for generating IDs.
//
function StorageKeys() {
    this.tags = "tags";
    this.clothes = "clothes";
    this.favs = "favs";

    // This function was from:
    // http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript 
    this.makeId = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
}
var storageKeys;

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};