require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./modules/user/user.controller')
const noteRouter = require('./modules/note/note.controller')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(userRouter)
app.use(noteRouter)

module.exports = app
