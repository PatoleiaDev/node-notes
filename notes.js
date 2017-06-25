// Node core modules
const fs = require('fs');

var fetchNotes = () => {
  // Try catch - in case the Database doens't exist or has corrupted data.
  try {
    // Fetches all notes from the Database and stores it into an array.
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);

  } catch (e) {
    return [];
  }
};

// Saves the notes in stringify
var savesNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// Add's a note to the Database.
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
// Stores the value of the titles (in the Database) that match the title inputed by the user.
var duplicateNotes = notes.filter((note) => note.title === title);
// if duplicateNotes has nothing inside it means that the title doesn't exist and can be created.
if (duplicateNotes.length === 0) {
    notes.push(note);
    savesNotes(notes);
    return note;
} else {}
};


// Print's all avalible notes to the console.
var getAll = () => {
  return fetchNotes();
};

// Fetches a single note to the console.
var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNote = notes.filter((note) => note.title === title)
  return filteredNote[0];
};

// Removes a note from the Database.
var removeNote = (title) => {
  notes = fetchNotes();
  // New array with all titles that dont match the one inputed by the user.
  var afterRemove = notes.filter((note) => note.title !== title)
  // Checks if the title was found in the Database.
  return notes.length === afterRemove.length;
  savesNotes(afterRemove);
};

// Logs the note to the console.
var logNote = (note) => {
  console.log('---');
  console.log('Title:', note.title);
  console.log('Body:', note.body);
}


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
