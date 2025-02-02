import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

// Paths
const __filename = fileURLToPath(import.meta.url); // Path of the current file
const __dirname = path.dirname(__filename); // Path of the current directory

// Filepaths
const dbFilePath = path.join(__dirname, 'notes.json');
const tempFilePath = path.join(__dirname, 'temp.txt');

// Initialize the database if it doesn't exist
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, '[]');
}

// Utility to read the notes from database
const readDB = () => {
  try {
    const dataBuffer = fs.readFileSync(dbFilePath);
    return JSON.parse(dataBuffer);
  } catch (error) {
    console.log('Error while reading from database');
  }
}

// Utility to update the database
const updateDB = (notes) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(notes));
  } catch (error) {
    console.log('Error while updating the database');
  }
}

// Utility to print a single note
const printNote = (note) => {
  const output = `Name: ${note.name}\nContent: ${note.content}`;
  console.log(output);
}

// Utility to clear the note content editor
const clearEditor = () => {
  fs.writeFileSync(tempFilePath, '');
}

// Utility to open the note content editor
const openEditor = (initialContent = '') => {
  fs.writeFileSync(tempFilePath, initialContent);
  const editor = process.env.EDITOR || 'vim';
  spawnSync(editor, [tempFilePath], { stdio: "inherit" });
}

// Utility to read content from the note content editor
const readEditor = () => {
  return fs.readFileSync(tempFilePath, 'utf-8');
}

// Function to create a new note
export const createNote = (name, content) => {
  // Array of note objects
  const notes = readDB();

  // Checking if the name provided doesn't already exist in another note.
  const duplicateNote = notes.find(note => note.name === name);
  if (duplicateNote) {
    console.log('Note with same name already exists. Try again.');
    console.log('Existing Note =', duplicateNote);
    return;
  }

  // Creation of note object
  const note = {
    created: Date.now(),
    name,
    content,
    modified: null
  }

  // Note's content will be from the temp file
  // If no content has been provided while creating the note.
  if (!content) {
    openEditor();
    const noteContent = readEditor();
    clearEditor();
    note.content = noteContent;
  }

  // Creating a note in DB
  notes.push(note);

  // Updating DB and notifying user
  updateDB(notes);
  console.log('Note Added Successfully');
}

// Function to update an existing note.
export const updateNote = (name, newContent) => {
  const notes = readDB();
  const note = notes.find(note => note.name === name);

  if (!note) {
    console.log(`Error: note with name "${name}" not found`);
    return;
  }

  if(!newContent) {
    openEditor(note.content);
    const contentFromEditor = readEditor();
    clearEditor();
    note.content = contentFromEditor;
  } else {
    note.content = newContent;
  }

  updateDB(notes);
  console.log('Note Updated Successfully');
}

// Function to delete a note.
export const deleteNote = (name) => {
  const notes = readDB();
  const noteIdx = notes.findIndex(note => note.name === name);

  if (noteIdx == -1) {
    console.log(`Note with name "${name}" doesn't exist`);
    return;
  }

  // Removing note from DB
  notes.splice(noteIdx, 1);

  updateDB(notes);
  console.log('Note Deleted Sucessfully');
}

// Function to list all the notes or a specific note from the database
export const listNotes = (noteName) => {
  const notes = readDB();

  if (noteName) {
    printNote(noteName);
  } else {
    notes.forEach(note => printNote(note));
  }
}

// Function to clear the database
export const clearNotes = () => {
  updateDB([]);
  console.log('Cleared all the notes.');
}