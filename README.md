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
After installation, you can use the `notes` command followed by various subcommands to manage your notes.

### Example:
```sh
nman create "My first note" "personal"
```

## Commands
- `nman create <note> [-t <tag>]`: Add a new note with an optional tag.
- `nman list`: List all notes.
- `nman list [noteName]`: View a specific note by its name.
- `nman update <noteName> <new content>`: Update the content of a specific note.
- `nman delete <noteName>`: Delete a specific note by its name.
- `nman clear`: Clear/Delete all the notes