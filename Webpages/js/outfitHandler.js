var clothesTop;
var clothesBottom;
var clothesShoe;

var currTop;
var currBottom;
var currShoe;

var isLocked;

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

var generateOutfit = function() {
	var indT = Math.floor(Math.random()*(clothesTop.length - 1));
	var indB = Math.floor(Math.random()*(clothesBottom.length - 1));
	var indS = Math.floor(Math.random()*(clothesShoe.length - 1));

	currTop = clothesTop[indT];
	currBottom = clothesBottom[indB];
	currShoe = clothesShoe[indS];

	if (!isLocked[0]) {
		getClothingDB(currTop, function(c) {
			$('#topImg').attr('src', c);
		});
	}
	if (!isLocked[1]) {
		getClothingDB(currBottom, function(c) {
			$('#bottomImg').attr('src', c);
		});
	}
	if (!isLocked[2]) {
		getClothingDB(currShoe, function(c) {
			$('#shoeImg').attr('src', c);
		});
	}
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

	if (favExists(new Array(currTop, currBottom, currShoe))) {
		$('#favButton').buttonMarkup({ theme: "e" }).button('refresh');;
	} else {
		$('#favButton').buttonMarkup({ theme: "b" }).button('refresh');;
	}
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

	if (favExists(new Array(currTop, currBottom, currShoe))) {
		$('#favButton').buttonMarkup({ theme: "e" }).button('refresh');;
	} else {
		$('#favButton').buttonMarkup({ theme: "b" }).button('refresh');;
	}
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

	if (favExists(new Array(currTop, currBottom, currShoe))) {
		$('#favButton').buttonMarkup({ theme: "e" }).button('refresh');;
	} else {
		$('#favButton').buttonMarkup({ theme: "b" }).button('refresh');;
	}
};

var lock = function(index, tagID) {
	if (isLocked[index]) {
		$(tagID).attr('src', 'img/unlock.png');
		isLocked[index] = false;
	} else {
		$(tagID).attr('src', 'img/lock.png');
		isLocked[index] = true;
	}
};

$('#top').click(function() {
	lock(0, '#topIconImg');
});

$('#bottom').click(function() {
	lock(1, '#bottomIconImg');
});

$('#shoe').click(function() {
	lock(2, '#shoeIconImg');
});

$('#genOutfitButton').click(function() {
	generateOutfit();
});

$('#favButton').click(function() {
	var favList = new Array(currTop, currBottom, currShoe);
	addFavorite(favList);
	$('#favButton').buttonMarkup({ theme: "e" }).button('refresh');;
});

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

	isLocked = new Array(false, false, false);

	getListOfTop();
	getListOfBottom();
	getListOfShoes();

	generateOutfit();
});
