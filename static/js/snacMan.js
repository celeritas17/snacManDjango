$(function(){
	// These are taken from hidden inputs on puzzle template:
	/////////////////
	var cell = $('#cell_id').val(); // numeric id for the muncher on the board.
	var bad_cell = $('#bad_guy_id').val(); // id for bad guy on the board.
	var row_size = parseInt($('#row_size').val()); 
	var col_size = parseInt($('#col_size').val());
	var right_answers = $('#right_answers').val().split(' ');
	var wrong_answers = $('#wrong_answers').val().split(' ');
	/////////////////

	var num_correct = right_answers.length;
	var corrects = {};
	for (var i = 0; i < num_correct; i++){
		corrects[right_answers[i].split('_').join(' ')] = 1;
	}

	$('#' + cell).toggle(); // Make sure muncher image is visible on starting square.
	$('#' + bad_cell + "bad").toggle(); // Make bad buy visible on starting square.

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
	};

	/* functions for moving the muncher and bad_guy: */
	/////////////////

	var toggle_picture = function(id, cell_id){
		if (id == "cell"){
			cell = cell_id;
			$('#' + cell).toggle();
		}
		else{
			bad_cell = cell_id;
			$('#' + bad_cell + "bad").toggle();
		}
	}

	var move_left = function(id, cell_id){
		var current_cell = parseInt(cell_id);
		
		if (current_cell%row_size == 0){
			cell_id = (current_cell + (row_size - 1));
		}
		else{
			cell_id = (current_cell - 1);
		}
		toggle_picture(id, cell_id);
	};

	var move_right = function(id, cell_id){
		var current_cell = parseInt(cell_id);
		
		if (current_cell%col_size == (col_size - 1)){
			cell_id = (current_cell - (col_size - 1));
		}
		else{
			cell_id = (current_cell + 1);
		}
		toggle_picture(id, cell_id);
	};

	var move_up = function(id, cell_id){
		var current_cell = parseInt(cell_id);
		
		if (current_cell < row_size){
			cell_id = (current_cell + (row_size - 1)*row_size);
		}
		else{
			cell_id = (current_cell - row_size);
		}
		toggle_picture(id, cell_id);
	};

	var move_down = function(id, cell_id){
		var current_cell = parseInt(cell_id);
		
		if (current_cell >= (row_size - 1)*row_size){
			cell_id = (current_cell - (row_size - 1)*row_size);
		}
		else{
			cell_id = (current_cell + col_size);
		}
		toggle_picture(id, cell_id);
	};
	/////////////////

	/* Event Handlers for muncher navigation buttons: */
	/////////////////
	$('#left').click(function(){move_left("cell", cell)});
	$('#right').click(function(){move_right("cell", cell)});
	$('#up').click(function(){move_up("cell", cell)});
	$('#down').click(function(){move_down("cell", cell)});
	$('#munch').click(munch);
	/////////////////

	/* Event handlers for keypresses: */
	/////////////////
	$(document).on('keydown', function(event){
		if (event.which >= 37 && event.which <= 40)
			$('#' + cell).toggle();
		switch (event.which){
			case 37:
				move_left("cell", cell);
				break;
			case 38:
				move_up("cell", cell);
				break;
			case 39:
				move_right("cell", cell);
				break;
			case 40:
				move_down("cell", cell);
				break;
			case 13:
				munch();
				break;
			default:
				break;
		}
	});
	/////////////////

	var move_bad_guy = function(){
		var moves = [move_left, move_right, move_up, move_down];
		$('#' + bad_cell + "bad").toggle();
		moves[Math.floor(Math.random()*4)]("bad_cell", bad_cell);
	};

	var bad_moves = setInterval(move_bad_guy, 1000);

});