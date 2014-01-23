from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('snacMan.views',
  # Examples:
  # url(r'^$', 'snacMan.views.home', name='home'),
  # url(r'^blog/', include('blog.urls')),
  url(r'^puzzles/', include('puzzles.urls')),
  url(r'^admin/', include(admin.site.urls)),
  url(r'^main/$', 'main'),
	url(r'^login/$', 'login'),
	url(r'^authenticate/', 'auth_view'),
	url(r'^register/$', 'register'),
	url(r'^register_success/$', 'register_success'),
	url(r'^register_fail/$', 'register_fail'),
)
