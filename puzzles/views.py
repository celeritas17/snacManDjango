from django.shortcuts import render, render_to_response
from puzzles.models import PuzzleCategory, Puzzle, PuzzleAttempt
from random import shuffle
from django.core.context_processors import csrf
from django.http import HttpResponseRedirect
from django.utils.timezone import now

def puzzle(request, puzzle_id):
	p = Puzzle.objects.get(id=puzzle_id)
	answers = [ans.replace('_', ' ') for ans in p.right_answers.split() + p.wrong_answers.split()]
	shuffle(answers)
	context = {'puzzle': p, 
						 'answers': answers,
						 'row_size': 4,
						 'col_size': 4,
						 'cell_id': 0, # starting cell for muncher; cells range from 0 to row_size*col_size
						 'bad_guy_id': 15, # starting cell for bad buy
						 'num_correct': 8, # number of correct answers on the board
	}
	context.update(csrf(request))
	return render_to_response('puzzle.html', context)

def puzzles(request):
	puzzles = Puzzle.objects.all()
	context = {'puzzles': Puzzle.objects.all()[0:14]}

	return render_to_response('puzzles.html', context)

def victory(request):
	user = request.user
	puzzle = Puzzle.objects.get(pk=request.POST['puzzle_id'])
	pa = PuzzleAttempt(puzzle=puzzle, success=True, attempt_date=now(), user=user)
	pa.save()
	return render_to_response("victory.html", {})




