function handleSuccess(json) {
  console.log('success');
}

function handleError(json) {
  console.log('failure');
}

$(document).ready(function() {
	console.log('this is app.js');
	
	// "There Again" button
	// When clicked, the details of the specific instance are packaged and and saved to the user's profile data on db
	$('.there-again').on('click', function() {
		var businessName = $(this).closest('.business').find('.business-name').html();
		var businessImageURL = $(this).closest('.business').find('img').attr('src');
		var businessYelpURL = $(this).closest('.business').find('.business-yelp-link a').attr('href');
		var businessAddress = $(this).closest('.business').find('.business-address').html();
		
		// key difference here
		var thereAgain = true;
		
		var businessToSave = {
			businessName: businessName,
			businessImageURL: businessImageURL,
			businessYelpURL: businessYelpURL,
			businessAddress: [businessAddress],
			thereAgain: thereAgain
		};
		// console.log(businessToSave);

		$.ajax({
			method: 'post',
			url: '/profile',
			data: businessToSave
		});
		alert('business added!');
		window.location.href = './search';
	});

	// "NOT There Again" button
	// When clicked, the details of the specific instance are packaged and and saved to the user's profile data on db
	$('.not-there-again').on('click', function() {
		var businessName = $(this).closest('.business').find('.business-name').html();
		var businessImageURL = $(this).closest('.business').find('img').attr('src');
		var businessYelpURL = $(this).closest('.business').find('.business-yelp-link a').attr('href');
		var businessAddress = $(this).closest('.business').find('.business-address').html();
		
		// key difference here
		var thereAgain = false;
		
		var businessToSave = {
			businessName: businessName,
			businessImageURL: businessImageURL,
			businessYelpURL: businessYelpURL,
			businessAddress: [businessAddress],
			thereAgain: thereAgain
		};
		// console.log(businessToSave);

		$.ajax({
			method: 'post',
			url: '/profile',
			data: businessToSave
		});
		alert('business added!');
		window.location.href = './search';
	});

	//"Edit" button
	$('.edit').on('click', function() {
		console.log('edit button clicked');
	});

	//"Delete" button
	$('.delete').on('click', function() {
		console.log('delete button clicked');
	});
});