from django.shortcuts import render, render_to_response
from puzzles.models import PuzzleCategory, Puzzle

def puzzle_board(request):
	return render_to_response('puzzle.html', {})

def puzzle(request, puzzle_id):
	p = Puzzle.objects.get(id=puzzle_id)
	context = {'puzzle': p}
	return render_to_response('puzzle.html', context)


