const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config()

const notesRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/api/notes', notesRouter)

const port = app.get('port')
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`)
})

module.exports = app
