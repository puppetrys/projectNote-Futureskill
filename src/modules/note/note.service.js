const NoteModel = require('../../models/note/note.model')

function createNote() {

    const newNote = NoteModel({
        tag: []
    })

    return newNote.save()

}

function updateNote(id, noteData) {

    const newUpdate = NoteModel.findByIdAndUpdate(
        id,
        {
            title: noteData.title,
            description: noteData.description,
            $push: { tag: noteData.tag },
            status: noteData.status,
            type: noteData.type
        },
    )

    return newUpdate;
}

function deleteNote(id) {
    return NoteModel.findByIdAndRemove(id)
}

function deleteTagNot(Id, noteTag) {
    return NoteModel.findByIdAndUpdate(
        Id,
        { $pull: { tag: noteTag.tag } }
    )
}

function findManyNoteList(query) {
    let baseQuery = {}

    if (query.title) {
        baseQuery = {
            ...baseQuery,
            ...{
                title: {
                    $regex: new RegExp(query.title),
                },
            },
        }
    }

    if (query.description) {
        baseQuery = {
            ...baseQuery,
            description: {
                $regex: new RegExp(query.description),
            },
        }
    }

    if (query.type) {
        baseQuery = {
            ...baseQuery,
            type: query.type
        }
    }


    if (query?.tag) {
        baseQuery = {
            ...baseQuery,
            tag: { $in: query?.tag }
        }
    }

    if (query?.status) {
        baseQuery = {
            ...baseQuery,
            status: { $in: query.status }
        }
    }

    return NoteModel.find(baseQuery);
}

function findDataOnPageNoteList(query) {
    if (query.page && query.limit) {
        const page = query.page
        const limit = query.limit

        return NoteModel.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .exec()
    } else {
        return NoteModel.find()
            .exec()
    }
}

function findPageNoteList() {
    return NoteModel.countDocuments().exec()
}


module.exports = { createNote, updateNote, deleteNote, deleteTagNot, findManyNoteList, findDataOnPageNoteList, findPageNoteList }