# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'PuzzleCategory'
        db.create_table(u'puzzles_puzzlecategory', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('category_name', self.gf('django.db.models.fields.CharField')(default='misc', max_length=50)),
        ))
        db.send_create_signal(u'puzzles', ['PuzzleCategory'])

        # Adding model 'Puzzle'
        db.create_table(u'puzzles_puzzle', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('right_answers', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('wrong_answers', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('category', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['puzzles.PuzzleCategory'])),
        ))
        db.send_create_signal(u'puzzles', ['Puzzle'])


    def backwards(self, orm):
        # Deleting model 'PuzzleCategory'
        db.delete_table(u'puzzles_puzzlecategory')

        # Deleting model 'Puzzle'
        db.delete_table(u'puzzles_puzzle')


    models = {
        u'puzzles.puzzle': {
            'Meta': {'object_name': 'Puzzle'},
            'category': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['puzzles.PuzzleCategory']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'right_answers': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'wrong_answers': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        u'puzzles.puzzlecategory': {
            'Meta': {'object_name': 'PuzzleCategory'},
            'category_name': ('django.db.models.fields.CharField', [], {'default': "'misc'", 'max_length': '50'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['puzzles']