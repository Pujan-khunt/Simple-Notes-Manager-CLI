#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'notes.json');

// Create 'notes.json' to store objects containing information about a note
// Initialize the file with an empty array 
fs.writeFileSync(filePath, '[]');

const readDB = () => {
  const dataBuffer = fs.readFileSync(filePath);
  return JSON.parse(dataBuffer);
}

const createNote = (name, content) => {
  const note = {
    created: Date.now(),
    name,
    content,
    modified: null
  }

  let notes = readDB();
  notes.push(note);
  fs.writeFileSync(filePath, JSON.stringify(notes));  
  console.log('Note added successfully');
}

// Configuring basic details about the project
program
  .name('Notes Manager')
  .description('A simple notes manager that allows you to create, read, update and delete notes.')
  .version('1.0.0')

program
  .command('create <noteName> <noteContent>')
  .description('Create a note, providing the content and the name for the note.')
  .action((noteName, noteContent) => createNote(noteName, noteContent))

program.parse(process.argv);