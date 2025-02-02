# Notes Manager CLI

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)

## Introduction
Notes Manager CLI is a command-line interface tool designed to help you manage your notes efficiently. It allows you to create, read, update, and delete notes directly from your terminal.

## Features
- Create new notes
- List all notes
- View a specific note
- Update existing notes
- Delete notes

## Installation

### Method 1: Installation via npm

To install Notes Manager CLI via npm, run the following command:

```sh
npm install -g @pujan2412/notes-manager-cli
```

<br/>

### Method 2: Installation via github
To install Notes Manager CLI, follow these steps:

1. Clone the repository:
  ```sh
  git clone https://github.com/Pujan-khunt/Simple-Notes-Manager-CLI
  ```
2. Navigate to the project directory:
  ```sh
  cd Simple-Notes-Manager-CLI
  ```
3. Install the required dependencies:
  ```sh
  npm install
  ```
4. Link the CLI tool globally:
  ```sh
  npm link
  ```

## Usage
After installation, you can use the `nman` command followed by various subcommands to manage your notes.

### Example:
```sh
nman create "My first note" -m "this is the content of my first note."
```

## Commands
1. `nman create <noteName>`: creates a new note and opens the default editor to enter the content of the note. (you can directly provide the message using the -m flag as shown in the example)

2. `nman list`: List all notes in a tabular format. (Shows only a constant number of lines per note. To view the full note use thc command mentioned below)
3. `nman list [noteName]`: View a specific note by its name in a box format.
4. `nman update <noteName>`: Update the content of a specific note (it will open the default editor if the message is not provided directly using the '-m' flag).
5. `nman delete <noteName>`: Delete a specific note by its name.
6. `nman clear`: Clear/Delete all the notes