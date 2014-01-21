$(function(){
	var cell = $('#cell_id').val();
	var row_size = $('#row_size').val();
	var col_size = $('#col_size').val();

	$('#' + cell).toggle();

	$('.nav_button').click(function(){
		$('#' + cell).toggle();
	});

	$('#left').click(function(){
		var new_cell;

		$('#' + new_cell).toggle();
	});

	$('#right').click(function(){
		
	});

	$('#up').click(function(){
		
	});

	$('#down').click(function(){
		
	});
});