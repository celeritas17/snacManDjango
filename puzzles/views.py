from django.shortcuts import render, render_to_response
from puzzles.models import PuzzleCategory, Puzzle, PuzzleAttempt
from random import shuffle
from django.core.context_processors import csrf
from django.http import HttpResponseRedirect
from django.utils.timezone import now
import random 

def puzzle(request, puzzle_id):
	row_size = 4
	col_size = 4

	p = Puzzle.objects.get(id=puzzle_id)
	user = request.user
	answers = [ans.replace('_', ' ') for ans in p.right_answers.split() + p.wrong_answers.split()]
	shuffle(answers)
	if user.id:
		pa = PuzzleAttempt(puzzle=p, attempt_date=now(), user=user)
		pa.save()
	else:
		pa = False
	prizes = random.sample(xrange(0, row_size*col_size - 1), 3) # ids for the hidden prizes
	prize1, prize2, prize3 = prizes

	context = {'puzzle': p, 
						 'answers': answers,
						 'row_size': row_size,
						 'col_size': col_size,
						 'cell_id': 0, # starting cell for muncher; cells range from 0 to row_size*col_size
						 'bad_guy_id': 15, # starting cell for bad buy
						 'num_correct': 8, # number of correct answers on the board
						 'prizes': prizes,
						 'prize1': prize1,
						 'prize2': prize2,
						 'prize3': prize3,
						 'attempt_id': (0 if not pa else pa.id),
	}
	context.update(csrf(request))
	return render_to_response('puzzle.html', context)

def puzzles(request, position):
	user = request.user
	puzzles = Puzzle.objects.all()
	position = int(position)
	puzzles_on_page = 14
	puzzles_left = len(Puzzle.objects.all()) - position
	next_position = position + puzzles_on_page
	orig_position = 0
	context = {'puzzles': Puzzle.objects.all()[position:position+next_position], 
						 'user': user,
						 'orig_position': 0,
						 'position': position,
						 'next_position': next_position,
						 'puzzles_on_page': puzzles_on_page,
						 'puzzles_left': puzzles_left,
						 }

	return render_to_response('puzzles.html', context)

def endgame(request):
	puzzle_id = request.POST['puzzle_id']
	attempt_id = request.POST['attempt_id']
	success = request.POST['winning']
	score = request.POST['score']
	context = {'success': success, 
						 'puzzle_id': puzzle_id,
						}
	if success == 'victory':
		if int(attempt_id) > 0:
			pa = PuzzleAttempt.objects.get(pk=attempt_id)
			pa.success = True
			pa.score = score
			pa.save()
		context['score'] = score

	return render_to_response('game_over.html', context)




