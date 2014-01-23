from django.core.context_processors import csrf
from django.shortcuts import render, render_to_response
from django.contrib import auth
from django.http import HttpResponseRedirect

def main(request):
	return render_to_response('main.html')

def login(request):
	context = {}	
	context.update(csrf(request))
	return render_to_response('login.html', context)

def auth_view(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	user = auth.authenticate(username=username, password=password)

	if user is not None:
		auth.login(request, user)
		return HttpResponseRedirect('/puzzles/all')
	else:
		return HttpResponseRedirect('/puzzles/login')

def signup(request):
	pass

def register(request):
	pass