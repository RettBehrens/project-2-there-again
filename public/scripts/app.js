$(document).ready(function() {
	$('#businesses').on('click', '.add-business', function(event) {
	//var id= $(this).parents('.album').data('album-id');
	//$('#songModal').data('album-id', id);
	console.log($('#addBusinessModal'));
	$('#addBusinessModal').modal();
	});
});







// $('#searchForm').on('submit', function(event) {
	// 	event.preventDefault();
	// 	$.ajax({
	// 		method: 'GET',
	// 		url: '/searchResults',
	// 		data: {
	// 			businessName: $('#businessName').val(),
	// 			businessCity: $('#businessCity').val()
	// 		},
	// 		success: function(results){
	// 			console.log(results);
	// 		}
	// 	});
	// });