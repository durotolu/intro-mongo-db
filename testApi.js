const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { urlencoded, json } = require('body-parser');
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        minlength: 10
    }
})

const Note = mongoose.model('note', noteSchema)

app.use(morgan('dev'));
app.use(urlencoded({extended: true}));
app.use(json());

app.get('/note', (req, res) => {
    const notes = await Note.find({})
        .lean()//speeds up database queries, returns pure JSON instead of mongoose objects (we don't get the fancy properties on it)
        // .sort()
        // .skip(10)
        // .limit(10)
        .exec()
    res.status(200).json(notes)
})

app.post('/note', async (req, res) => {
    const noteToBeCreated = req.body
    const note = await Note.create(noteToBeCreated)
    res.status(201).json(note.toJSON())//or toObject() leans the response (lean can be used only on queries)
})

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/testApi')
}

connect()
    .then(async connection => {
        app.listen(5000)
    })
    .catch(e => console.error(e))