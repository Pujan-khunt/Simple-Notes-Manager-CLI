import fs from 'fs';

// Default database filepath
const filePath = './notes.json';

// Initialize the database if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]');
}

// Utility to read the notes from database
export const readDB = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    return JSON.parse(dataBuffer);
  } catch (error) {
    console.log('Error while reading from database');
  }
}

// Utility to update the database
export const updateDB = (notes) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(notes));
  } catch (error) {
    console.log('Error while updating the database');
  }
}

// Utility to print a single note
export const printNote = (note) => {
  const output = `Name: ${note.name}\nContent: ${note.content}\n`;
  console.log(output);
}

// Function to create a new note
export const createNote = (name, content) => {
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

  // Creating a note in DB
  notes.push(note);

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

  // Updating note content in DB
  note.content = newContent;

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