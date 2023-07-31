
const notes = require('../../repositories/MockedDB.json')
const noteSchema  = require('../../helpers/validators')

const createNote = async (req, res) => {
try {
  const newNote = req.body
  noteSchema.validateSync(newNote)
  const createdNote = { ...newNote }
  notes.push(createdNote)
  res.status(201).json(createdNote)
} catch (e) {
  res.status(400).json({message: 'Failed to create the note. Please ensure all fields are filled correctly.'})
}
}

const editNote = async (req, res) => {
 try{
   const id = req.params.id
   const updatedNote = req.body
   noteSchema.validateSync(updatedNote)
   const index = notes.findIndex((n) => n.id === id)
   if (index >= 0) {
     notes[index] = { ...notes[index], ...updatedNote }
     res.json(notes[index])
   } else {
     res.status(404).json({ message: 'Note not found' })
   }
 } catch (e) {
   res.status(500).json({ message: 'An error occurred while updating the note.' })
 }
}

const deleteNote = async (req, res) => {
  try{
    const id = req.params.id
    const index = notes.findIndex((n) => n.id === id)
    if (index >= 0) {
      const deletedNote = notes.splice(index, 1)[0]
      res.json(deletedNote)
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (e) {
    res.status(500).json({ message: 'An error occurred while deleting the note.' })
  }
}

const toggleArchiveNote = async (req, res) => {
  try {
    const id = req.params.id
    const {archived} = req.body
    const index = notes.findIndex((n) => n.id === id)

    if (index !== -1) {
      notes[index] = { ...notes[index], archived: archived }
      res.json(notes[index])
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (e) {
    res.status(500).json({ message: 'An error occurred while updating the note.' })
  }
}


const getAllNotes = async (req, res) => {
  try{
    res.status(200).json(notes)
  } catch (e) {
    res.status(500).json({ message: 'An error occurred while fetching all notes.' })
  }
}

const getOneNote = async (req, res) => {
 try{
   const id = req.params.id
   const note = notes.find((n) => n.id === id)
   if (note) {
     res.json(note)
   } else {
     res.status(404).json({ message: 'Note not found' })
   }
 } catch (e) {
   res.status(500).json({ message: 'An error occurred while fetching the note.' })
 }
}

const getStats = async (req, res) => {

  try {

    const categoriesCount = notes.reduce((acc, note) => {
      const status = note.archived ? 'archived' : 'active'
      const category = note.category

      acc[category] = acc[category] || {active: 0, archived: 0}
      acc[category][status]++
      return acc
    }, {})
    res.json(categoriesCount)
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching statistics.' })
  }
}


module.exports = {
  createNote, editNote, getAllNotes, deleteNote, getStats, getOneNote, toggleArchiveNote
}

