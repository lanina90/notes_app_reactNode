const express = require('express')
const router = express.Router()
const {createNote,
  deleteNote,
  editNote,
  getAllNotes,
  getOneNote,
  toggleArchiveNote,
  getStats} = require('./controllers/notes')



//Create a note object/
router.post('/', createNote )

//Remove item/
router.delete('/:id', deleteNote )

//Edit item/
router.patch('/:id', editNote)

//Toggle Archive note item/
router.patch('/toggle/:id', toggleArchiveNote)

//Get all notes
router.get('/', getAllNotes )

//Retrieve item/
router.get('/:id', getOneNote)

//Get aggregated data statistics/
router.get('/stats/all', getStats)


module.exports = router
