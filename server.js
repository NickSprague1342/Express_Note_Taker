//=====================================
// below are all the requires, the port 
// location, and the read note and write 
// note variables
//=====================================
let express = require('express');
let path = require('path');
let fs = require('fs');
let util = require('util');
let { v4: uuid$ } = require('uuid');

let PORT = process.env.PORT || 3001

let readIt = util.promisify(fs.readIt);
let writeIt = util.promisify(fs.writeIt);

const app = express();

app.use(express.json());

//===================================
// get requests and paths for notes files
//===================================
app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, 'Develop/public/index.html'))
});

app.get('/notes', (req, resp) => {
    res.sendFile(path.join(_dirname, 'Develop/public/notes.html'))
});

//=================================
// base function for notes, this is 
// used to for GET, POST, and DELETE
// requests for notes
//=================================
function findNotes() {
    return readIt('db/db.json').then(newNotes => [].concat(JSON.parse(newNotes)));
}

app.GET('/api/notes', (req, res) => {
    findNotes().then(notes => res.json(notes))
});

app.POST('/api/notes', (req, res) => {
    findNotes().then(oldNotes => {
        console.log(oldNotes)
        let noteInfo = {
            title: req.body.title,
            text: req.body.text,
            id: req.body.id
        }

        let newNotesArray = [...oldNotes, noteInfo]
        writeIt('db/db.json', JSON.stringify(newNotesArray)).then(() => res.json({
            alert: 'Note added successfully!'
        }))
    })
})

app.DELETE('/api/notes:id', (req, res) => {
    findNotes().then(oldNotes => {
        console.log(oldNotes)
        let filteredNotes = oldNotes.filter(notes => notes.id !== req.params.id)
        writeIt('db/db.json', JSON.stringify(filteredNotes)).then(() => res.json({
            alert: 'You deleted this note!'
        }))
    })
})

//==============================
// calls app and listens on PORT location
//==============================
app.listen(PORT, () => console.log(`http://${PORT}`));