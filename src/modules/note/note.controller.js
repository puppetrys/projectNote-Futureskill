const router = require('express').Router()
const noteFunc = require('../note/note.service')
const auth = require('../../middleware/auth')

router.post('/note/create', auth, async (req, res) => {
    try {
        const newnote = await noteFunc.createNote()

        res.status(201).send(newnote)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.patch('/note/update/:id', auth, async (req, res) => {
    try {
        const UpdateNote = await noteFunc.updateNote(req.params.id, req.body)

        if (UpdateNote === null) {
            res.status(404).send({ id: req.params.id, err: "nothing found" })
            return
        }
        res.status(201).send(UpdateNote)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete('/note/delete/:id', auth, async (req, res) => {
    try {
        const status = await noteFunc.deleteNote(req.params.id)

        if (status === null) {
            res.status(404).send({ id: req.params.id, err: "nothing found" })
            return
        }

        res.status(200).send({
            id: req.params.id,
            isDeleted: true,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.patch('/note/deletetag/:id', auth, async (req, res) => {
    try {
        const updateTagNote = await noteFunc.deleteTagNot(req.params.id, req.body)

        if (updateTagNote === null) {
            res.status(404).send({ id: req.params.id, err: "nothing found" })
            return
        }

        res.status(200).send({
            id: req.params.id,
            isTagDeleted: true,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/note/filtertag', auth, async (req, res) => {
    try {
        const dateNote = await noteFunc.findManyNoteList(req.query)

        res.status(200).send(dateNote);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/note/pagenote', auth, async (req, res) => {
    try {
        const [_results, _count] = await Promise.all([noteFunc.findDataOnPageNoteList(req.query), noteFunc.findPageNoteList()])

        return res.json({
            currentPage: req.query.page,
            pages: Math.ceil(_count / req.query.limit),
            currentCount: _results.length,
            totalCount: _count,
            data: _results
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router;