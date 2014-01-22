from django.shortcuts import render, render_to_response
from puzzles.models import PuzzleCategory, Puzzle
from random import shuffle

def puzzle_board(request):
	return render_to_response('puzzle.html', {})

def puzzle(request, puzzle_id):
	p = Puzzle.objects.get(id=puzzle_id)
	answers = [ans.replace('_', ' ') for ans in p.right_answers.split() + p.wrong_answers.split()]
	shuffle(answers)
	context = {'puzzle': p, 
						 'answers': answers,
						 'row_size': 4,
						 'col_size': 4,
						 'cell_id': 0, # starting cell for muncher; cells range from 0 to row_size*col_size
	}
	return render_to_response('puzzle.html', context)

def puzzles(request):
	puzzles = Puzzle.objects.all()
	context = {'puzzles': Puzzle.objects.all()}

	return render_to_response('puzzles.html', context)