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

app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, 'Develop/public/index.html'))
});

app.get('/notes', (req, resp) => {
    res.sendFile(path.join(_dirname, 'Develop/public/notes.html'))
});

function notes() {
    return readIt('db/db.json').then(newNotes => [].concat(JSON.parse(newNotes)));
}