const fs = require('fs');
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

const { notes } = require("./db/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Generates Unique ID
const generateUniqueId = require('generate-unique-id');

//Create new note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFilySync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray }, null, 2)
    );
    return note;
};

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = generateUniqueID();
    const note = createNewNote(req.body, notes);
    res.json(note);
});

app.listen(PORT, () => {
    console.log(`app is listening on PORT ${PORT}`);
});