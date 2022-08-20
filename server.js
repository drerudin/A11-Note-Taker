const express = require('express');
const fs = require("fs");
const notes = require("../db/db.json");
const path = require("path");
const uuid = require("uuid");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");
const { application } = require('express');


const app = express();
var PORT = process.env.PORT || 3001;

// Middleware app
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/notes.html")
});

app.get("/api/notes", (req, res) => {
  let notes = fs.readFileSync("db/db.json");
  let data = notes.toString();
  res.json(JSON.parse(data));
});

app.get("", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"))
} );

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(newNote);
} );

app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  let newNotes = notes.filter(note => note.id !== id);
  fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
  res.json(newNotes);
} );

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
} );

