from django.core.context_processors import csrf
from django.shortcuts import render, render_to_response
from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponse
from forms import SnacManRegistrationForm

def main(request):
	user = request.user
	return render_to_response('main.html', {'user': user})

def login(request):
	context = {}	
	context.update(csrf(request))
	return render_to_response('login.html', context)

def logout(request):
	auth.logout(request)
	return render_to_response('main.html', {'logout': True})

def auth_view(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	user = auth.authenticate(username=username, password=password)

	if user is not None:
		auth.login(request, user)
		return HttpResponseRedirect('/puzzles/all')
	else:
		return HttpResponseRedirect('/login')

def register(request):
	if request.method == 'POST':
		form = SnacManRegistrationForm(request.POST)
		if form.is_valid():
			form.save()
			return HttpResponseRedirect('/register_success')
		else:
			return HttpResponseRedirect('/register_fail')

	context = {}
	context.update(csrf(request))
	context['form'] = SnacManRegistrationForm()

	return render_to_response('register.html', context)

def register_success(request):
	return render_to_response('register_success.html')

def register_fail(request):
	return render_to_response('register_fail.html')

