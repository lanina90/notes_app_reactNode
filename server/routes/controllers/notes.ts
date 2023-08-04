import notes from '../../repositories/MockedDB.json'
import {noteSchema} from '../../helpers/validators'
import {Request, Response} from "express";
import UserNote from "../../repositories/Model";

interface CategoryStats {
  active: number;
  archived: number;
}

interface CategoriesCount {
  [category: string]: CategoryStats;
}

interface NoteType {
  id?: number
  title: string
  category: string
  content: string
  created: string
  dates: string
  archived: boolean
}

export const createNote = async (req: Request, res: Response) => {
  try {
    const newNote = req.body
    noteSchema.validateSync(newNote, { abortEarly: false });
    const createdNote = await UserNote.create(newNote)
    res.status(201).json(createdNote)

  } catch (e: any) {
    console.log(e.errors);
    res.status(400).json({message: 'Failed to create the note. Please ensure all fields are filled correctly.'})
  }
}

export const editNote = async (req: Request, res: Response) => {
  try{
    const id: number = parseInt(req.params.id, 10);
    const updatedNote: NoteType = req.body
    noteSchema.validateSync(updatedNote, { abortEarly: false });
    const existingNote = await UserNote.findOne({ where: { id } });
    if (existingNote) {
      const updatedNoteInDB = await existingNote.update(updatedNote);
      res.json(updatedNoteInDB);
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
    const id: number = parseInt(req.params.id, 10);
    const noteToDelete = await UserNote.findOne({ where: { id } });
    if (noteToDelete) {
      await noteToDelete.destroy();
      res.json({ message: 'Note has been deleted', id });
    } else {
      res.status(404).json({ message: 'Note not found' })
    }
  } catch (e) {
    res.status(500).json({ message: 'An error occurred while deleting the note.' })
  }
}

export const archiveNote = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const noteToArchive = await UserNote.findOne({ where: { id } });
    if (noteToArchive) {
      noteToArchive.setDataValue('archived', true);
      await noteToArchive.save();
      res.json(noteToArchive);
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
    const id: number = parseInt(req.params.id, 10);
    const noteToArchive = await UserNote.findOne({ where: { id } });
    if (noteToArchive) {
      noteToArchive.setDataValue('archived', false);
      await noteToArchive.save();
      res.json(noteToArchive);
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
    const userNotes = await UserNote.findAll();
    res.status(200).json(userNotes)
  } catch (e) {
    res.status(500).json({ message: 'An error occurred while fetching all notes.' })
  }
}

export const getOneNote = async (req: Request, res: Response) => {
  try{

    const id: number = parseInt(req.params.id, 10);
    const note = await UserNote.findOne({ where: { id } });

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
    const allNotes = await UserNote.findAll()

    const categoriesCount = allNotes.reduce((acc, note) => {
      const status: "archived" | "active" = note.getDataValue('archived') ? 'active' : 'archived';
      const category: string = note.getDataValue('category');

      acc[category] = acc[category] || {active: 0, archived: 0}
      acc[category][status]++
      return acc
    }, {} as CategoriesCount)
    res.json(categoriesCount)
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching statistics.' })
  }
}