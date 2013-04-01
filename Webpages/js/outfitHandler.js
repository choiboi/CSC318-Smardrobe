var clothesTop;
var clothesBottom;
var clothesShoe;

var topCategories = ['outerwear', 'tshirt'];
var bottomCategories = ['pant'];
var shoeCategories = ['shoe'];

var getListOfTop = function() {
	clothesTop = new Array();

	for (var i = 0; i < topCategories.length; i++) {
		clothesTop = clothesTop.concat(retrieveClothingByTag(topCategories[i]));
	}
};

var getListOfBottom = function() {
	clothesBottom = new Array();

	for (var i = 0; i < bottomCategories.length; i++) {
		clothesBottom = clothesBottom.concat(retrieveClothingByTag(bottomCategories[i]));
	}
};

var getListOfShoes = function() {
	clothesShoe = new Array();

	for (var i = 0; i < shoeCategories.length; i++) {
		clothesShoe = clothesShoe.concat(retrieveClothingByTag(shoeCategories[i]));
	}
};

var setupOutfit = function() {
	var topwear = clothesTop[0];
	var bottomwear = clothesBottom[0];
	var shoewear = clothesShoe[0];

	getClothingDB(topwear, function(c) {
		$('#topImg').attr('src', c);
	});

	getClothingDB(bottomwear, function(c) {
		$('#bottomImg').attr('src', c);
	});

	getClothingDB(shoewear, function(c) {
		$('#shoeImg').attr('src', c);
	});
};

// $(document).on('pageinit', '[data-role="page"]#smardrobe', function() {
$(document).ready(function() {
	// Swipe event listener for top wear.
	$('#top').on('swipeleft', function() {
		alert('top: swipe left');
	});

	$('#top').on('swiperight', function() {
		alert('top: swipe right');
	});

	// Swipe event listener for pants.
	$('#bottom').on('swipeleft', function() {
		alert('bottom: swipe left');
	});

	$('#bottom').on('swiperight', function() {
		alert('bottom: swipe right');
	});

	// Swipe event listener for shoes.
	$('#shoe').on('swipeleft', function() {
		alert('shoe: swipe left');
	});

	$('#shoe').on('swiperight', function() {
		alert('shoe: swipe right');
	});

	getListOfTop();
	getListOfBottom();
	getListOfShoes();

	setupOutfit();
});
