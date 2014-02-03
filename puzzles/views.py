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
	pa = PuzzleAttempt(puzzle=p, attempt_date=now(), user=user)
	pa.save()
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
						 'attempt_id': pa.id,
	}
	context.update(csrf(request))
	return render_to_response('puzzle.html', context)

def puzzles(request):
	puzzles = Puzzle.objects.all()
	context = {'puzzles': Puzzle.objects.all()[0:14]}

	return render_to_response('puzzles.html', context)

def endgame(request):
	attempt_id = request.POST['attempt_id']
	success = request.POST['winning']
	score = request.POST['score']
	context = {'success':success}
	if success == 'victory':
		pa = PuzzleAttempt.objects.get(pk=attempt_id)
		pa.success = True
		pa.score = score
		pa.save()
		context['score'] = score

	return render_to_response('game_over.html', context)




