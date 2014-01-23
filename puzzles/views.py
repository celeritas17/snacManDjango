from django.shortcuts import render, render_to_response
from puzzles.models import PuzzleCategory, Puzzle
from random import shuffle
from django.core.context_processors import csrf
from django.contrib import auth
from django.http import HttpResponseRedirect

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
	context = {'puzzles': Puzzle.objects.all()[0:14]}

	return render_to_response('puzzles.html', context)

def main(request):
	return render_to_response('main.html')

def signup(request):
	pass

def login(request):
	context = {}	
	context.update(csrf(request))
	return render_to_response('login.html', context)

def register(request):
	pass

def auth_view(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	user = auth.authenticate(username=username, password=password)

	if user is not None:
		auth.login(request, user)
		return HttpResponseRedirect('/puzzles/all')
	else:
		return HttpResponseRedirect('/puzzles/login')



