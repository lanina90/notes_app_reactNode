

import express from 'express'
import {
  createNote,
  deleteNote,
  editNote,
  getAllNotes,
  getOneNote,
  getStats,
  archiveNote, unArchiveNote
} from './controllers/notes'

export const router = express.Router()

//Create a note object/
router.post('/', createNote )

//Remove item/
router.delete('/:id', deleteNote )

//Edit item/
router.patch('/:id', editNote)

//Archive note item/
router.patch('/archive/:id', archiveNote)

//Unarchived note item/
router.patch('/unarchive/:id', unArchiveNote)

//Get all notes
router.get('/', getAllNotes )

//Retrieve item/
router.get('/:id', getOneNote)

//Get aggregated data statistics/
router.get('/stats/all', getStats)



