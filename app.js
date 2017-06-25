// Node core modules
const fs = require('fs');
// Npm 3rd party modules
const _ = require('lodash')
const yargs = require('yargs')
// My modules
const notes = require('./notes.js')

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}
// Stores the user input (command).
const argv = yargs
.command('add', 'Adds a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
  title: titleOptions
})
.command('remove', 'Removes a note', {
  title: titleOptions
})
.help()
.argv;
var command = argv._[0];
// Add's a new note.
if (command === 'add') {
  // If the note title doesn't exist: Add's a note + prints it to the screen.
  note = notes.addNote(argv.title, argv.body);
  if (_.isObject(note)) {
    console.log('Note added sucefully!');
    notes.logNote(note);
  } else {
    console.log('-------------------');
    console.log('Title already exists.');
  }
// Lists all existing notes.
} else if (command === 'list') {
 var allNotes = notes.getAll();
 console.log(`Total: ${allNotes.length} note(s).`);
   allNotes.forEach((note) => notes.logNote(note));
// Prints a single note to the screen.
} else if (command === 'read'){
  var note = notes.getNote(argv.title);
  if (_.isObject(note)) {
    notes.logNote(note);
} else {
  console.log('Note not found');
}
// Removes a single note from the Database;
} else if (command === 'remove') {
 let noteRemoved = notes.removeNote(argv.title);
 var message = noteRemoved ? `Note '${argv.title}', not found.` : `Note '${argv.title}', removed.`;
 console.log(message);
 // Else, if no valid command in entered.
} else {
  console.log('Command not recognized');
}
