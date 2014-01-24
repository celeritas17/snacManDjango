from django.contrib import admin
from puzzles.models import PuzzleCategory, Puzzle, PuzzleAttempt

admin.site.register(PuzzleCategory)
admin.site.register(Puzzle)
admin.site.register(PuzzleAttempt)
