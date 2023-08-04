
import notes from '../../repositories/MockedDB.json'
import {noteSchema} from '../../helpers/validators'
import {Request, Response} from "express";

interface CategoryStats {
  active: number;
  archived: number;
}

interface CategoriesCount {
  [category: string]: CategoryStats;
}

interface NoteType {
  id: string
  title: string
  category: string
  content: string
  created: string
  dates: string
  archived: boolean
}

export const createNote = async (req: Request, res: Response) => {
  try {
    const newNote: NoteType = req.body
    noteSchema.validateSync(newNote, { abortEarly: false });
    const createdNote = { ...newNote }
    notes.push(createdNote)
    res.status(201).json(createdNote)

  } catch (e: any) {
    console.log(e.errors);
    res.status(400).json({message: 'Failed to create the note. Please ensure all fields are filled correctly.'})
  }
}

export const editNote = async (req: Request, res: Response) => {
  try{
    const id: string = req.params.id
    const updatedNote: NoteType = req.body
    noteSchema.validateSync(updatedNote, { abortEarly: false });
    const index: number = notes.findIndex((n: NoteType) => n.id === id)
    if (index >= 0) {
      notes[index] = { ...notes[index], ...updatedNote }
      res.json(notes[index])
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (e: any) {
    console.log(e.errors);
    res.status(500).json({ message: 'An error occurred while updating the note.' })
  }
}

export const deleteNote = async (req: Request, res: Response) => {
  try{
    const id: string = req.params.id
    const index:number = notes.findIndex((n) => n.id === id)
    if (index >= 0) {
      const deletedNote: NoteType = notes.splice(index, 1)[0]
      res.json(deletedNote)
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (e) {
    res.status(500).json({ message: 'An error occurred while deleting the note.' })
  }
}

export const archiveNote = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const index: number = notes.findIndex((n) => n.id === id)
    if (index !== -1) {
      notes[index].archived = true;
      res.json(notes[index])
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (e: any) {
    console.log(e.errors);
    res.status(500).json({ message: 'An error occurred while updating the note.' })
  }
}

export const unArchiveNote = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const index: number = notes.findIndex((n) => n.id === id)
    if (index !== -1) {
      notes[index].archived = false;
      res.json(notes[index])
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (e: any) {
    console.log(e.errors);
    res.status(500).json({ message: 'An error occurred while updating the note.' })
  }
}



export const getAllNotes = async (req: Request, res: Response) => {
  try{
    res.status(200).json(notes)
  } catch (e) {
    res.status(500).json({ message: 'An error occurred while fetching all notes.' })
  }
}

export const getOneNote = async (req: Request, res: Response) => {
  try{

    const id: string = req.params.id
    const note: NoteType | undefined = notes.find((n) => n.id === id)

    if (note) {
      noteSchema.validateSync(note, { abortEarly: false })
      res.json(note)
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (e: any) {
    console.log(e.errors);
    res.status(500).json({ message: 'An error occurred while fetching the note.' })
  }
}

export const getStats = async (req: Request, res: Response) => {

  try {

    const categoriesCount: CategoriesCount = notes.reduce((acc, note) => {
      const status: "archived" | "active" = note.archived ? 'archived' : 'active'
      const category: string = note.category

      acc[category] = acc[category] || {active: 0, archived: 0}
      acc[category][status]++
      return acc
    }, {} as CategoriesCount)
    res.json(categoriesCount)
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching statistics.' })
  }
}

