$(function(){
	var cell = $('#cell_id').val();
	var row_size = $('#row_size').val();
	var col_size = $('#col_size').val();

	$('#' + cell).toggle();

	$('.nav_button').click(function(){
		$('#' + cell).toggle();
	});

	$('#left').click(function(){
		var current_cell = parseInt(cell);
		
		if (current_cell%row_size == 0){
			cell = (current_cell + (row_size - 1));
		}
		else{
			cell = (current_cell - 1);
		}
		$('#' + cell).toggle();
	});

	$('#right').click(function(){
		var current_cell = parseInt(cell);
		
		if (current_cell%col_size == 3){
			cell = (current_cell - (col_size - 1));
		}
		else{
			cell = (current_cell + 1);
		}
		$('#' + cell).toggle();
	});

	$('#up').click(function(){
		var current_cell = parseInt(cell);
		
		if (current_cell < row_size){
			cell = (current_cell + (row_size - 1)*row_size);
		}
		else{
			cell = (current_cell - row_size);
		}
		$('#' + cell).toggle();
	});

	$('#down').click(function(){
		var current_cell = parseInt(cell);
		
		if (current_cell >= (row_size - 1)*row_size){
			cell = (current_cell - (row_size - 1)*row_size);
		}
		else{
			cell = (current_cell + 4);
		}
		$('#' + cell).toggle();
	});
});