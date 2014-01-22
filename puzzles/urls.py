from django.conf.urls import patterns, include, url

urlpatterns = patterns('puzzles.views',
	url(r'^puzzle_board/$', 'puzzle_board'),
	url(r'^get/(?P<puzzle_id>\d+)/$', 'puzzle'),
	url(r'^all/$', 'puzzles'),
	)