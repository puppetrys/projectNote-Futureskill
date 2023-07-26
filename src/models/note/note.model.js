const Schema = require('mongoose').Schema
const Model = require('mongoose').model

const NoteSchema = new Schema({
    title: {
        type: String,
        default: "Title"
    },
    description: {
        type: String,
        default: "Description"
    },
    tag:
        [String],
    status: {
        type: String,
        enum: ['in-progress', 'completed'],
        default: "in-progress"
    },
    type: {
        type: String,
        enum: ['note', 'task'],
        default: "note"
    }
})

const NoteModel = Model('note', NoteSchema)
module.exports = NoteModel