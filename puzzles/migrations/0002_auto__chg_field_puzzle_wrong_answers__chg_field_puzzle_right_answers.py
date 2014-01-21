# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Puzzle.wrong_answers'
        db.alter_column(u'puzzles_puzzle', 'wrong_answers', self.gf('django.db.models.fields.CharField')(max_length=500))

        # Changing field 'Puzzle.right_answers'
        db.alter_column(u'puzzles_puzzle', 'right_answers', self.gf('django.db.models.fields.CharField')(max_length=500))

    def backwards(self, orm):

        # Changing field 'Puzzle.wrong_answers'
        db.alter_column(u'puzzles_puzzle', 'wrong_answers', self.gf('django.db.models.fields.CharField')(max_length=200))

        # Changing field 'Puzzle.right_answers'
        db.alter_column(u'puzzles_puzzle', 'right_answers', self.gf('django.db.models.fields.CharField')(max_length=200))

    models = {
        u'puzzles.puzzle': {
            'Meta': {'object_name': 'Puzzle'},
            'category': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['puzzles.PuzzleCategory']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'right_answers': ('django.db.models.fields.CharField', [], {'max_length': '500'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'wrong_answers': ('django.db.models.fields.CharField', [], {'max_length': '500'})
        },
        u'puzzles.puzzlecategory': {
            'Meta': {'object_name': 'PuzzleCategory'},
            'category_name': ('django.db.models.fields.CharField', [], {'default': "'misc'", 'max_length': '50'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['puzzles']