import fs from 'fs/promises';
import Table from 'cli-table3';
import boxen from 'boxen';
import chalk from 'chalk';
import { linesToDisplayPerNote, dbFilePath } from './constants.js'
import { readDB, updateDB, useEditor } from './utilities.js';

// Initialize the database if it doesn't exist
const initializeDB = async () => {
  try {
    await fs.access(dbFilePath);
  } catch (error) {
    await fs.writeFile(dbFilePath, '[]');
  }
}

// Function to create a new note
export const createNote = async (name, content) => {
  await initializeDB();
  const notes = await readDB();

  // Checking if the name provided doesn't already exist in another note.
  const duplicateNote = notes.find(note => note.name === name);
  if (duplicateNote) {
    console.log(chalk.redBright("Note with same name already exists. Try again."));
    console.log(boxen(duplicateNote.content, {
      title: duplicateNote.name,
      titleAlignment: "center"
    }));
    return;
  }

  // Creation of note object
  const note = {
    created: Date.now(),
    name,
    content,
    modified: null
  }

  // Note's content will come from the temp file
  // If no content has been provided while creating the note.
  if (!content) {
    note.content = await useEditor();

    if (!note.content) {
      console.log(chalk.redBright("No content has been provided. Try again."));
      return;
    }
  }

  // Creating a note in DB
  notes.push(note);

  // Updating DB and notifying user
  updateDB(notes);
  console.log(chalk.greenBright("Note Added Successfully"));
}

// Function to update an existing note.
export const updateNote = async (name, newContent) => {
  const notes = await readDB();
  const note = notes.find(note => note.name === name);

  if (!note) {
    console.log(chalk.yellowBright(`Error: note with name "${name}" not found`));
    return;
  }

  // updated content of note will come from temp file
  // if not content is provided while updating the note.
  if (!newContent) {
    const previousContent = note.content;
    const newContent = await useEditor(note.content);

    if (newContent === previousContent) {
      console.log(chalk.yellowBright("No content has been updated."));
      return;
    }

    note.content = newContent;
  } else {
    note.content = newContent;
  }

  // Updating DB and notifying user
  updateDB(notes);
  console.log('Note Updated Successfully');
}

// Function to delete a note.
export const deleteNote = async (name) => {
  const notes = await readDB();
  const noteIdx = notes.findIndex(note => note.name === name);

  if (noteIdx == -1) {
    console.log(`Note with name "${name}" doesn't exist`);
    return;
  }

  // Removing note from DB
  notes.splice(noteIdx, 1);

  // Updating the DB and notifying the user
  updateDB(notes);
  console.log(chalk.greenBright("Note Deleted Sucessfully"));
}

// Function to list all the notes or a specific note from the database
export const listNotes = async (noteName) => {
  const notes = await readDB();
  const table = new Table({
    head: ["No.", "Title", "Content"]
  });

  if (noteName) {
    const note = notes.find(note => note.name === noteName);

    // Note not found
    if (!note) {
      console.log(chalk.yellowBright(`Note with name "${noteName}" doesn't exist`));
      return;
    }

    // Printing a single note in box format
    console.log(boxen(note.content, {
      title: note.name,
      titleAlignment: "center"
    }));

  } else {
    // Empty database case
    if (notes.length === 0) {
      console.log(chalk.blueBright("Create notes. No notes are currently stored."));
      return;
    }

    // Creating a table with all the notes.
    // Only displaying a constant number of lines per note.
    notes.forEach((note, index) => {
      let idx;
      let cnt = 0;
      for (let i = 0; i < note.content.length; i++) {
        if (note.content[i] === '\n') {
          cnt++;
        }

        if (cnt == linesToDisplayPerNote) {
          idx = i;
          break;
        }
      }

      // Building the table
      table.push([index + 1, note.name, note.content.substr(0, idx)]);

    });

    // Printing the table.
    console.log(table.toString());
  }

}

// Function to clear the database
export const clearNotes = () => {
  updateDB([]);
  console.log(chalk.magentaBright("Cleared all the notes."));
}