#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'notes.json');

// Create 'notes.json' to store objects containing information about a note
// Initialize the file with an empty array 
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]');
}

const readDB = () => {
  const dataBuffer = fs.readFileSync(filePath);
  return JSON.parse(dataBuffer);
}

const updateDB = (notes) => {
  fs.writeFileSync(filePath, JSON.stringify(notes));
}

const createNote = (name, content) => {
  const note = {
    created: Date.now(),
    name,
    content,
    modified: null
  }
  
  const notes = readDB();
  
  // Checking if the name provided doesn't already exist in another note.
  const duplicateNote = notes.find(note => note.name === name);
  if (duplicateNote) {
    console.log('Note with same name already exists. Try again.');
    console.log('Existing Note =', duplicateNote);
    return;
  }

  notes.push(note);

  updateDB(notes);
  console.log('Note Added Successfully');
}

const updateNote = (name, newContent) => {
  const notes = readDB();
  const note = notes.find(note => note.name === name);

  note.content = newContent;

  updateDB(notes);
  console.log('Note Updated Successfully');
}

// Configuring basic details about the project
program
  .name('Notes Manager')
  .description('A simple notes manager that allows you to create, read, update and delete notes.')
  .version('1.0.0')

program
  .command('create <noteName> <noteContent>')
  .description('Create a new note.')
  .action((noteName, noteContent) => createNote(noteName, noteContent))

program
  .command('update <noteName> <newNoteContent>')
  .description('Update the content an existing note.')
  .action((noteName, newNoteContent) => updateNote(noteName, newNoteContent))

program.parse(process.argv);