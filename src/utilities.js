import fs from 'fs/promises';
import { execSync, spawnSync } from 'child_process';
import { dbFilePath, tempFilePath } from "./constants.js";
import { charactersToDisplayPerLine, linesToDisplayPerNote } from './constants.js';

// Utility to read the notes from database
export const readDB = async () => {
  try {
    const dataBuffer = await fs.readFile(dbFilePath);
    return JSON.parse(dataBuffer);
  } catch (error) {
    console.log('Error while reading from database', error.message);
    process.exit(1);
  }
}

// Utility to update the database
export const updateDB = async (notes) => {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(notes));
  } catch (error) {
    console.log('Error while updating the database', error.message);
    process.exit(1);
  }
}

const isEditorAvailable = (editor) => {
  try {
    let command = '';

    if (process.platform === "win32") {
      command = `where ${editor}`;
    } else {
      command = `which ${editor}`;
    }

    execSync(command, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// Utility to clear the note content editor
const clearEditor = async () => {
  try {
    await fs.writeFile(tempFilePath, '');
  } catch (error) {
    console.log('Error while clearing the note content editor', error.message);
    process.exit(1);
  }
}

// Utility to open the note content editor
const openEditor = async (initialContent = "") => {
  try {
    await fs.writeFile(tempFilePath, initialContent);

    // Creating command based on the editor available to the user
    let editor = process.env.VISUAL || process.env.EDITOR;
    if (!editor) {
      if (isEditorAvailable("code")) {
        editor = "code";
      } else if (isEditorAvailable("vim")) {
        editor = "vim";
      } else {
        editor = "nano";
      }
    }

    if (editor === "code") {
      spawnSync(editor, ["--wait", tempFilePath], { stdio: "inherit", shell: true });
    } else {
      spawnSync(editor, [tempFilePath], { stdio: "inherit", shell: true });
    }

  } catch (error) {
    console.log('Error while opening the note content editor', error.message);
    process.exit(1);
  }
}

// Utility to read content from the note content editor
const readEditor = async () => {
  try {
    return await fs.readFile(tempFilePath, 'utf-8');
  } catch (error) {
    console.log('Error while reading the note content editor', error.message);
  }
}

// Utility to use the editor
export const useEditor = async (initialContent) => {
  await openEditor(initialContent);
  const contentFromEditor = await readEditor();
  await clearEditor();
  return contentFromEditor.trim();
}

export const displayTrimmedContent = (content) => {
  return content
    .split("\n")
    .slice(0, linesToDisplayPerNote)
    .map(line => line.slice(0, charactersToDisplayPerLine))
    .join("\n");
}