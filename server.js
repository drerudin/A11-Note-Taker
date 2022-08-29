const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));``

app.get('/'), (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html'));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => {
    res.json(notes);
    });

app.get('/api/notes/:id', (req, res) => {
    if (req.body && req.params.id) {
        const Id = req.params.id;
        for (let i = 0; i < notes.length; i++) {
            if (notes.id === Id) {
                res.json(notes[i]);
                return;
            }
        }
        res.json('No note found');
    }
}
);

app.post('/api/notes', (req, res) => {
    req.body.id = Math.floor(Math.random() * 1000000).toString()
    note = {
        id: req.body.id,
        title: req.title,
        text: req.body.text
    }
    notes.push(req.body)
    res.json(notes);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
}
);

// delete a note using the id
app.delete('/api/notes/:id', (req, res) => {
    const Id = req.params.id;
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === Id) {
            notes.splice(i, 1);
            res.json(notes);
            fs.writeFileSync('./db/db.json', JSON.stringify(notes));
            return;
        }
    }
    res.json('No note found');
}
);

// uses handleNewNoteView to update note in the db
app.put('/api/notes/:id', (req, res) => {
    const Id = req.params.id;
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === Id) {
            notes[i].title = req.body.title;
            notes[i].text = req.body.text;
            res.json(notes);
            fs.writeFileSync('./db/db.json', JSON.stringify(notes));
            return;
        }
    }
    res.json('No note found');
}
);



// listen for requests :)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));