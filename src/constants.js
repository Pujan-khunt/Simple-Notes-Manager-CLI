import path from 'path';
import { fileURLToPath } from 'url';

// Constants
export const linesToDisplayPerNote = 2;

// Paths
const __filename = fileURLToPath(import.meta.url); // Path of the current file
export const __dirname = path.dirname(__filename); // Path of the current directory

// Filepaths
export const dbFilePath = path.join(__dirname, 'notes.json');
export const tempFilePath = path.join(__dirname, 'temp.txt');