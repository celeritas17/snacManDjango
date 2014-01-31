from django.db import models
from django.contrib.auth.models import User

class PuzzleCategory(models.Model):
	CATEGORY_NAMES = [('sports', 'Sports'), 
										('music', 'Music'),
										('politics', 'Politics'),
										('movies', 'Movies'),
										('science', 'Science'),
										('history', 'History'),
										('food', 'Food'),
										('events', 'Current Events'),
										('animals', 'Animals'),
										('geography', 'Geography'),
										('arts', 'Arts'),
										('computers', 'Computers'),
										('education', 'Education'), 
										('law', 'Law'),
										('people', 'People'),
										('religion', 'Religion'),
										('words', 'Words'),
										('misc', 'Miscellaneous'),
	]
	category_name = models.CharField(max_length=50, choices=CATEGORY_NAMES, default="misc")

	def __unicode__(self):
		return self.category_name

class Puzzle(models.Model):
	title = models.CharField(max_length=50)
	right_answers = models.CharField(max_length=500) 
	wrong_answers = models.CharField(max_length=500)
	category = models.ForeignKey(PuzzleCategory)

	def __unicode__(self):
		return self.title

class PuzzleAttempt(models.Model):
	puzzle = models.ForeignKey(Puzzle)
	score = models.IntegerField(default=0)
	success = models.BooleanField(default=False)
	attempt_date = models.DateTimeField('date attempted')
	user = models.ForeignKey(User)

