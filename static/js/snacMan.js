$(function(){
	// These are taken from hidden inputs on puzzle template:
	/////////////////
	var cell = $('#cell_id').val(); // numeric id for the muncher on the board.
	var bad_cell = $('#bad_guy_id').val(); // id for bad guy on the board.
	var row_size = parseInt($('#row_size').val()); 
	var col_size = parseInt($('#col_size').val());
	var right_answers = $('#right_answers').val().split(' ');
	var wrong_answers = $('#wrong_answers').val().split(' ');
	for (var i = 0; i < wrong_answers.length; i++){
		wrong_answers[i] = wrong_answers[i].split('_').join(' ');
	}
	var puzzle_id = parseInt($('#puzzle_id').val());
	prize_indices = [];
	for (var i = 0; i < 3; i++){
		prize_indices[i] = parseInt($('#prize' + (i + 1) + '_index').val());
	}
	/////////////////

	var bad_guy_vulnerable = false;
	var bad_guy_dead = false;
	var active_prizes = [false, false, false];
	var time_height = parseInt($('#time_bar').css('height')); 
	var munched_correct = 0;
	var num_lives = 3;
	var munching = false;
	var dieing = false;
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

	// Check if answer in the column is a key in the corrects object;
	// if it is, change progress bar, update num_to_win div, and check for victory.
	var check_answer = function(cell){
		if ($('#answer' + cell).html() in corrects){
			munched_correct++;
			var height = parseInt($('#progress_bar').css('height'));
			$('#progress_bar').css('height', (height + 20) + "px");
			$('#num_to_win').html((num_correct - munched_correct) + " to Win");
			if (winning()){
				clearInterval(clock);
				clearInterval(bad_moves);
				victory();	
			}
		}
	};

	// Check if user found all correct answers.
	var winning = function(){
		return (munched_correct === num_correct);
	};

	// Send ajax request to get victory screen
	var victory = function(){
		$.ajax({
			type: "POST",
			url: "/puzzles/victory/",
			data: {
				"puzzle_id": puzzle_id,
				"csrfmiddlewaretoken": $("input[name=csrfmiddlewaretoken]").val()
			},
			success: blue_screen_of_victory,
			dataType: 'html'
		});
	};

	// Show victory screen on board
	var blue_screen_of_victory = function(data, textStatus, jqXHR){
		$('#content').html(data);
	};

	// munch (chewing) animation function
	var munch = function(thing){
		munching = true;
		setTimeout(function(){munching=false;}, 210);
		var margin_top = parseInt($('#' + cell).css('margin-top'));

		var chew_timeout = function(i, j){
			setTimeout(function(){
                $('#' + cell).attr('src', 'http://www.googlefacebooktwitter.com/img/eat/eat' + i + '.png'); 
                margin_top += ((j < 5) ? -40 : 40);
                $('.muncher').css('margin-top', margin_top + "px");
        }, j*20);
		};
		var i = 1;
		var j = 0;
		for (; j < 10; j++){
			if (i <= 5 && j < 5)
				i++;
			else
				i--;
			chew_timeout(i, j);
		}
		if (thing != "prize") $('#answer' + cell).html('');
	};
	
	// 'Die' flashing animation function
	var die = function(){
		dieing = true;
		toggle_picture("cell", cell);
		toggle_picture("bad_cell", bad_cell);
		
		// Reset positions for bad guy and good guy
		cell = 0;
		bad_cell = row_size*col_size - 1;
		
		toggle_picture("bad_cell", bad_cell);
		
		var die_timeout = function(i){
			setTimeout(function(){
				toggle_picture("cell", cell);
			}, i*100);
		};
		
		setTimeout(function(){
			dieing = false;
		}, 1000);

		for (var i = 0; i < 11; i++){
			die_timeout(i);
		}
	};
 
	// Decrement num_lives and toggle one of the lives images
	var take_life = function(){
		$('#life' + num_lives--).toggle();
	};

	/* functions for moving the muncher and bad_guy: */
	/////////////////

	var toggle_picture = function(id, cell_id){
		if (id == "cell"){
			cell = cell_id;
			$('#' + cell).toggle();
		}
		else if (id == "bad_cell"){
			bad_cell = cell_id;
			$('#' + bad_cell + "bad").toggle();
		}
	};

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

	/* Functions for moving bad guy and handling collisions: */
	/////////////////
	var move_bad_guy = function(){
		var moves = [move_left, move_right, move_up, move_down];
		$('#' + bad_cell + "bad").toggle();
		moves[Math.floor(Math.random()*4)]("bad_cell", bad_cell);
	};

	var collision = function(){
		return (cell == bad_cell)
	};

	var collision_check = function(){
		if (collision() && !dieing && !bad_guy_vulnerable){
			take_life();
			die();
		}
		if (collision() && bad_guy_vulnerable && !bad_guy_dead){
			munch('prize');
			kill_bad_guy();
		}
	};

	var bad_moving = function(){
		return setInterval(function(){
			if (!dieing){
				move_bad_guy();
				collision_check();
			}
		}, 1000);
	};

	var bad_moves = bad_moving();
	/////////////////

	/* Event Handlers for muncher navigation buttons: */
	/////////////////
	$('#left').click(function(){move_left("cell", cell)});
	$('#right').click(function(){move_right("cell", cell)});
	$('#up').click(function(){move_up("cell", cell)});
	$('#down').click(function(){move_down("cell", cell)});
	$('#munch').click(munch);
	/////////////////

	/* Click handlers and related functions for prizes */
	/////////////////

	var prize_action1 = function(){
		var current_height = parseInt($('#time_bar').css('height'));
		var new_height = (current_height < time_height/2) ? current_height + time_height/2 : time_height;
		$('#time_bar').css('height', new_height);
	};

	var prize_action2 = function(){
		$('span:contains("' + wrong_answers[Math.floor(Math.random()*wrong_answers.length)] + '")').html('');
	};

	var prize_action3 = function(){
		bad_guy_vulnerable = true;
		$('img.bad_guy').attr('src', '/static/assets/img/ufo_blue.jpg');
		setTimeout(function(){
			$('img.bad_guy').attr('src', '/static/assets/img/ufo.jpg');
			if (bad_guy_dead) 
				$('#' + bad_cell + 'bad').toggle();
			bad_guy_vulnerable = false;
			clearInterval(bad_moves), bad_moving(); 
		}, 10000);
	};

	var kill_bad_guy = function(){
		bad_guy_dead = true;
		$('#' + bad_cell + 'bad').toggle();
		clearInterval(bad_moves);
	};

	var prize_actions = [prize_action1, prize_action2, prize_action3];

	var prize_munch = function(index){
				munch("prize");
				$('#prize' + prize_indices[index]).toggle();
	};

	var prize_check = function(){
		for (var i = 0; i < prize_indices.length; i++){
			if (cell == prize_indices[i] && active_prizes[i] === true){
				prize_munch(i);
				active_prizes[i] = -1;
				prize_actions[i]();
			}
		}
	};
	
	var add_prize_clicks = function(){
		var add_click_function = function(i){
			$('#prize_click' + (i + 1)).click(function(){
				if (active_prizes[i] === false){
					$('#prize' + prize_indices[i]).toggle();
					active_prizes[i] = true;
					prize_check();
				}
			});
		};
		for (var i = 0; i < prize_indices.length; i++){
			add_click_function(i);
		}
	}();
	/////////////////

	/* Event handlers for keypresses: */
	/////////////////
	$(document).on('keydown', function(event){
		if (!dieing){
			if (event.which >= 37 && event.which <= 40){
				$('#' + cell).toggle();
			}
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
					check_answer(cell); // Needs to be executed before munch
					if (!munching)
						munch();
					break;
				default:
					break;
			}
			collision_check();
			prize_check();
		}
	});
	/////////////////

	// function for the 'hour-glass' animation effect
	var tic_tock = function(time_height, clock_rate, clock_id){
		return setInterval(function(){
			var current_height = parseInt($('#' + clock_id).css('height'));
			$('#' + clock_id).css('height', (current_height - 5) + 'px');
		}, clock_rate);
	};

	var clock = tic_tock(160, 2250, "time_bar"); // start the 'hour-glass' animation.

});