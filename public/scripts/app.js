$(document).ready(function() {
	$('#searchForm').on('submit', function(event) {
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/searchResults',
			data: {
				businessName: $('#businessName').val(),
				businessCity: $('#businessCity').val()
			},
			success: function(results){
				console.log(results);
			}
		});
	});
});