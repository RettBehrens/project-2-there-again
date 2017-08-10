function handleSuccess(json) {
  console.log(json);
}

function handleError(json) {
  console.log(json);
}

$(document).ready(function() {
	console.log('this is app.js');
	
	//"There Again" button
	$('.there-again').on('click', function() {
		var businessName = $(this).closest('.business').find('.business-name').html();
		var businessImageURL = $(this).closest('.business').find('img').attr('src');
		var businessYelpURL = $(this).closest('.business').find('.business-yelp-link a').attr('href');
		var businessAddress = $(this).closest('.business').find('.business-address').html();
		var thereAgain = true;
		
		var businessToSave = {
			businessName: businessName,
			businessImageURL: businessImageURL,
			businessYelpURL: businessYelpURL,
			businessAddress: [businessAddress],
			thereAgain: thereAgain
		};
		console.log(businessToSave);

		$.ajax({
			method: 'post',
			url: '/profile',
			data: businessToSave,
			success: handleSuccess,
			error: handleError
		});
	});

	//"NOT There Again" button
	$('.not-there-again').on('click', function() {
		var businessName = $(this).closest('.business').find('.business-name').html();
		var businessImageURL = $(this).closest('.business').find('img').attr('src');
		var businessYelpURL = $(this).closest('.business').find('.business-yelp-link a').attr('href');
		var businessAddress = $(this).closest('.business').find('.business-address').html();
		var thereAgain = false;
		
		var businessToSave = {
			businessName: businessName,
			businessImageURL: businessImageURL,
			businessYelpURL: businessYelpURL,
			businessAddress: [businessAddress],
			thereAgain: thereAgain
		};
		console.log(businessToSave);

		$.ajax({
			method: 'post',
			url: '/profile',
			data: businessToSave,
			success: handleSuccess,
			error: handleError
		});
	});
});