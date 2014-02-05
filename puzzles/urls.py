from django.conf.urls import patterns, include, url

urlpatterns = patterns('puzzles.views',
	url(r'^get/(?P<puzzle_id>\d+)/$', 'puzzle'),
	url(r'^all/(?P<position>\d+)/$', 'puzzles'),
	url(r'^endgame/$', 'endgame'),
	)