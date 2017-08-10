$(document).ready(function() {
	console.log('this is the app.js');
	$('.there-again').on('click', function() {
		console.log($(this).closest('.business').find('img').attr('src'));
		console.log($(this).closest('.business').find('.business-name').html());
		console.log($(this).closest('.business').find('.business-address').html());
		console.log($(this).closest('.business').find('.business-yelp-link a').attr('href'));
		// var businessToSave = {
		// 	businessName: String,
		// 	businessImageURL: String,
		// 	businessYelpURL: String,
		// 	businessAddress: [String],
		// 	thereAgain: Boolean
		// };


		//6.AJAX POST this data
	});
});