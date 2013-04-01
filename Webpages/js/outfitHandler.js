var clothesTop;
var clothesBottom;
var clothesShoe;

var currTop;
var currBottom;
var currShoe;

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
	currTop = clothesTop[0];
	currBottom = clothesBottom[0];
	currShoe = clothesShoe[0];

	getClothingDB(currTop, function(c) {
		$('#topImg').attr('src', c);
	});

	getClothingDB(currBottom, function(c) {
		$('#bottomImg').attr('src', c);
	});

	getClothingDB(currShoe, function(c) {
		$('#shoeImg').attr('src', c);
	});
};

var swipedTop = function(direction) {
	var currInd = clothesTop.indexOf(currTop);
	var nextInd = 0;

	if (currInd + direction < 0) {
		nextInd = clothesTop.length - 1;
	} else if (currInd + direction >= clothesTop.length) {
		nextInd = 0;
	} else {
		nextInd = currInd + direction;
	}

	currTop = clothesTop[nextInd];
	getClothingDB(currTop, function(c) {
		$('#topImg').attr('src', c);
	});
};

var swipedBottom = function(direction) {
	var currInd = clothesBottom.indexOf(currBottom);
	var nextInd = 0;

	if (currInd + direction < 0) {
		nextInd = clothesBottom.length - 1;
	} else if (currInd + direction >= clothesBottom.length) {
		nextInd = 0;
	} else {
		nextInd = currInd + direction;
	}

	currBottom = clothesBottom[nextInd];
	getClothingDB(currBottom, function(c) {
		$('#bottomImg').attr('src', c);
	});
};

var swipedShoe = function(direction) {
	var currInd = clothesShoe.indexOf(currShoe);
	var nextInd = 0;

	if (currInd + direction < 0) {
		nextInd = clothesShoe.length - 1;
	} else if (currInd + direction >= clothesShoe.length) {
		nextInd = 0;
	} else {
		nextInd = currInd + direction;
	}

	currShoe = clothesShoe[nextInd];
	getClothingDB(currShoe, function(c) {
		$('#shoeImg').attr('src', c);
	});
};


// $(document).on('pageinit', '[data-role="page"]#smardrobe', function() {
$(document).ready(function() {
	// Swipe event listener for top wear.
	$('#top').on('swipeleft', function() {
		swipedTop(-1);
	});

	$('#top').on('swiperight', function() {
		swipedTop(1);
	});

	// Swipe event listener for pants.
	$('#bottom').on('swipeleft', function() {
		swipedBottom(-1);
	});

	$('#bottom').on('swiperight', function() {
		swipedBottom(1);
	});

	// Swipe event listener for shoes.
	$('#shoe').on('swipeleft', function() {
		swipedShoe(-1);
	});

	$('#shoe').on('swiperight', function() {
		swipedShoe(1);
	});

	getListOfTop();
	getListOfBottom();
	getListOfShoes();

	setupOutfit();
});
