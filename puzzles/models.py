from django.db import models

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
	right_answers = models.CharField(max_length=200) 
	wrong_answers = models.CharField(max_length=200)
	category = models.ForeignKey(PuzzleCategory)

	def __unicode__(self):
		return self.title
