$(document).on('pageinit', '[data-role="page"]#smardrobe', function() {
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
})
