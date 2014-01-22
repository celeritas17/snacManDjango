$(function(){
	var cell = $('#cell_id').val();
	var row_size = parseInt($('#row_size').val());
	var col_size = parseInt($('#col_size').val());

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
		
		if (current_cell%col_size == (col_size - 1)){
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
			cell = (current_cell + col_size);
		}
		$('#' + cell).toggle();
	});

	$('#munch').click(function(){
		var margin_top = parseInt($('#' + cell).css('margin-top'));
		var chew_timeout = function(i, j){
			setTimeout(function(){
                $('#' + cell).attr('src', 'http://www.googlefacebooktwitter.com/img/eat/eat' + i +'.png'); 
                margin_top += ((j < 5) ? -40 : 40)
                $('.muncher').css('margin-top', margin_top + "px");
        }, j*20);
		}
		var i = 1;
		var j = 0;
		for (; j < 10; j++){
			if (i <= 5 && j < 5)
				i++;
			else
				i--;
			chew_timeout(i, j);
		}
	});

});