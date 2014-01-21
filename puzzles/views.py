from django.shortcuts import render, render_to_response

def puzzle_board(request):
	return render_to_response('puzzle.html', {})


