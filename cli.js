#!/usr/bin/env node

import { Command } from 'commander';
import { createNote, updateNote, deleteNote, listNotes, clearNotes } from './notesManager.js';

const program = new Command();

// Configuring basic details about the project
program
  .name('Notes Manager')
  .description('A simple notes manager that allows you to create, read, update and delete notes.')
  .version('1.0.0')

program
  .command('create <noteName>')
  .description('Create a new note.')
  .option('-m, --message <noteContent>', 'Directly provide the note content.')
  .action((noteName, options) => createNote(noteName, options.message))

program
  .command('update <noteName> <newNoteContent>')
  .description('Update the content an existing note.')
  .action((noteName, newNoteContent) => updateNote(noteName, newNoteContent))

program
  .command('delete <noteName>')
  .description('Delete an existing note.')
  .action((noteName) => deleteNote(noteName))

program
  .command('list [noteName]')
  .description('List all the notes.')
  .action((noteName) => listNotes(noteName))

program
  .command('clear')
  .description('Clear all existing notes.')
  .action(() => clearNotes())

program.parse(process.argv);