from django.conf.urls import patterns, include, url

urlpatterns = patterns('puzzles.views',
	url(r'^puzzle_board/$', 'puzzle_board'),
	)