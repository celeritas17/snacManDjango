$(function(){
	var cell = $('#cell_id').val(); // numeric id for the muncher on the board.
	var row_size = parseInt($('#row_size').val()); 
	var col_size = parseInt($('#col_size').val());

	$('#' + cell).toggle(); // Make sure muncher image is visible on starting square.

	// Make muncher image invisible on current square before the .nav_button callback
	// makes the muncher image on another square visible.
	$('.nav_button').click(function(){
		$('#' + cell).toggle();
	});

	// munch (chewing) animation function
	var munch = function(){
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
		$('#answer' + cell).html('');
	}

	/* functions for moving the muncher: */
	/////////////////
	var move_left = function(){
		var current_cell = parseInt(cell);
		
		if (current_cell%row_size == 0){
			cell = (current_cell + (row_size - 1));
		}
		else{
			cell = (current_cell - 1);
		}
		$('#' + cell).toggle();
	}

	var move_right = function(){
		var current_cell = parseInt(cell);
		
		if (current_cell%col_size == (col_size - 1)){
			cell = (current_cell - (col_size - 1));
		}
		else{
			cell = (current_cell + 1);
		}
		$('#' + cell).toggle();
	}

	var move_up = function(){
		var current_cell = parseInt(cell);
		
		if (current_cell < row_size){
			cell = (current_cell + (row_size - 1)*row_size);
		}
		else{
			cell = (current_cell - row_size);
		}
		$('#' + cell).toggle();
	}

	var move_down = function(){
		var current_cell = parseInt(cell);
		
		if (current_cell >= (row_size - 1)*row_size){
			cell = (current_cell - (row_size - 1)*row_size);
		}
		else{
			cell = (current_cell + col_size);
		}
		$('#' + cell).toggle();
	}
	/////////////////

	/* Event Handlers for muncher navigation buttons: */
	/////////////////
	$('#left').click(move_left);
	$('#right').click(move_right);
	$('#up').click(move_up);
	$('#down').click(move_down);
	$('#munch').click(munch);
	/////////////////

	/* Event handlers for keypresses: */
	/////////////////
	$(document).on('keydown', function(event){
		if (event.which >= 37 && event.which <= 40)
			$('#' + cell).toggle();
		switch (event.which){
			case 37:
				move_left();
				break;
			case 38:
				move_up();
				break;
			case 39:
				move_right();
				break;
			case 40:
				move_down();
				break;
			case 13:
				munch();
				break;
			default:
				break;
		}
	});
	/////////////////
});