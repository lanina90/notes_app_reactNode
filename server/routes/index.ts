

import express from 'express'
import {createNote, deleteNote, editNote, toggleArchiveNote, getAllNotes, getOneNote, getStats  } from './controllers/notes'

export const router = express.Router()

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



