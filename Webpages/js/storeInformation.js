// This function retrieves all the associated tags of the specified
// clothing.
//
// @param clothingFilename - filename of the clothing.
// @return an array of tags.
var retrieveClothingTags = function(clothingFilename) {
	var tagsArray = jQuery.parseJSON(localStorage['tags']);
	return tagsArray.clothingFilename;
};

var addNewTags = function(clothingFilename, tag) {
	var tagsLocal = jQuery.parseJSON(localStorage['tags']);
	var clothesLocal = jQuery.parseJSON(localStorage['clothes']);

	/*
	if (typeof tag === "string") {

	} else if (tag instanceof Array) {

	}*/
};

$(document).ready(function() {
	storageKeys = new StorageKeys();
	localStorage.clear();

	// Initiate storage on first app start.
    if (typeof localStorage[storageKeys.tags] === "undefined") {
    	localStorage[storageKeys.tags] = JSON.stringify({});
    } 
    if (typeof localStorage[storageKeys.clothes] === "undefined") {
    	localStorage[storageKeys.clothes] = JSON.stringify({});
    }
    if (typeof localStorage[storageKeys.favs] === "undefined") {
		localStorage[storageKeys.favs] = JSON.stringify({});
	}
});

function StorageKeys() {
	this.tags = "tags";
	this.clothes = "clothes";
	this.favs = "favs";
}
var storageKeys;