
// // This function returns all favourite outfits stored.
//
var listFavourites = function() {
    var favsLocal = jQuery.parseJSON(localStorage[storageKeys.favs]);
    var outfits = [];
    var keys = [];
    
    for (var key in favsLocal) {
        if (favsLocal.hasOwnProperty(key)) {
            var clothesL = favsLocal[key];

            // Go through the list of clothes.
            outfits.push(clothesL);
            keys.push(key);

        }
    }
    
    return [keys, outfits];
}

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
// This function will check if a favourite outfit alreaady exists.
//
// @param clothes - an array of clothes filenames.
// @return boolean - TRUE if it exists, otherwise FALSE.
//
var favExists = function(clothes) {
    var favsLocal = jQuery.parseJSON(localStorage[storageKeys.favs]);
    var counter = 0;

    // Go through all the keys in favs JSON object.
    for (var key in favsLocal) {
        if (favsLocal.hasOwnProperty(key)) {
            var clothesL = favsLocal[key];

            // Go through the list of clothes.
            for (var ind = 0; ind < clothesL.length; ind++) {
                if (clothes.indexOf(clothesL[ind]) >= 0) {
                    counter += 1;
                }
            }

            if (counter === clothes.length) {
                return true;
            }
            counter = 0;
        }
    }

    return false;
};

//
// This functions return the list of clothes for the specified
// favourite.
//
// @param fav - name of favourite.
// @return an array of clothes for the favourite fav, otherwise null
//         if no such favourite exists.
//
var getFavouriteOutfit = function(fav) {
    var favsLocal = jQuery.parseJSON(localStorage[storageKeys.favs]);

    if (typeof favsLocal[fav] !== "undefined") {
        return favsLocal[fav];
    }

    return null;
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
// This function will remove the specified tag from the database.
//
// @param tag - tag in string.
//
var deleteTag = function(tag) {
    var tagsLocal = jQuery.parseJSON(localStorage[storageKeys.tags]);

    var tagClothesList = tagsLocal[tag];
    delete tagsLocal[tag]

    // Get the list of clothes so that for clothes associated with this tag,
    // we quickly remove this tag from the clothes list of tag.
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);
    for (var ind = 0; ind < tagClothesList.length; ind++) {
        var tempL = clothesLocal[tagClothesList[ind]];
        var index = tempL.indexOf(tag);

        if (index >= 0) {
            tempL.remove(index);
            clothesLocal[tagClothesList[ind]] = tempL;
        }
    }

    localStorage[storageKeys.clothes] = JSON.stringify(clothesLocal);
    localStorage[storageKeys.tags] = JSON.stringify(tagsLocal);
};

//
// This function adds new clothes filenames into our database. If the filename
// for the clothing is already in the database, then it is ignored.
//
// @param clothesFilename - Either an array of clothes filenames or single 
//                          filename string.
//
var addNewClothes = function(clothingBlob) {
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);
    var id= "";

    // If clothBlob is a string.
    if (typeof clothingBlob === "string") {
        id = storageKeys.makeId();
        // Make sure it doesn't use the same existing IDs.
        while (typeof clothesLocal[id] !== "undefined") {
            id = storageKeys.makeId();
        }
        clothesLocal[id] = new Array();
        addNewClothingDB(id, clothingBlob);

    // If clothBlob is a list of clothing blobs.
    } else if (clothingBlob instanceof Array) {
        for (var ind = 0; ind < clothingBlob.length; ind++) {
            id = storageKeys.makeId();
            // Make sure it doesn't use the same existing IDs.
            while (typeof clothesLocal[id] !== "undefined") {
                id = storageKeys.makeId();
            }
            clothesLocal[id] = new Array();
            addNewClothingDB(id, clothingBlob);
        }
    }

    localStorage[storageKeys.clothes] = JSON.stringify(clothesLocal);

    return id;
};

//
// This function removes the specified clothing from the database.
//
// @param clothing - clothing filename in string.
//
var deleteClothing = function(clothing) {
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);

    var clothesTagList = clothesLocal[clothing];
    delete clothesLocal[clothing];

    // Remove clothing filename from the tag list of clothes.
    var tagsLocal = jQuery.parseJSON(localStorage[storageKeys.tags]);
    for (var ind = 0; ind < clothesTagList.length; ind++) {
        var tempL = tagsLocal[clothesTagList[ind]];
        var index = tempL.indexOf(clothing);

        if (index >= 0) {
            tempL.remove(index);
            tagsLocal[clothesTagList[ind]] = tempL;
        }
    }

    localStorage[storageKeys.tags] = JSON.stringify(tagsLocal);
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
// @return an array of tags, otherwise null.
//
var retrieveTagsByClothing = function(clothingFilename) {
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);

    if (typeof clothesLocal[clothingFilename] === "undefined") {
        return null;
    }

    return clothesLocal[clothingFilename];
};

var listClothes = function() {
    var clothesLocal = jQuery.parseJSON(localStorage[storageKeys.clothes]);
    
    var keys = [];
    
    for (var key in clothesLocal) {
        if (clothesLocal.hasOwnProperty(key)) {
            var clothesL = favsLocal[key];

            // Go through the list of clothes.
            keys.push(key);

        }
    }
    
    return keys;
    
}
//
// This function retrieves all the associated clothes with the
// specified tag.
//
// @param tag - tag in string.
// @return an array of clothes filenames, otherwise null.
//
var retrieveClothingByTag = function(tag) {
    var tagsLocal = jQuery.parseJSON(localStorage['tags']);

    if (typeof tagsLocal[tag] === "undefined") {
        return null;
    }

    return tagsLocal[tag];
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

    app.initialize();
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
