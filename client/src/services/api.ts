import { $host } from './index'
import {NoteType} from "../store/notesSlice"

export const createNote = async (noteData: NoteType) => {
  try {
    const { data } = await $host.post('/notes', noteData)
    return data
  } catch (e) {
    console.error('Error creating note:', e)
    return null
  }
}
export const deleteNote = async (id: string) => {
  try{
    const { data } = await $host.delete('/notes/' + id)
    return data
  } catch (e) {
    console.error('Error deleting note:', e)
  }
}
export const editNote = async (id: string, updatedNote: NoteType) => {
  try{
    const { data } = await $host.patch('/notes/' + id, updatedNote)
    return data
  } catch (e) {
    console.error('Error deleting note:', e)
  }
}


export const archiveOnServer = async (id: string) => {
  try {
    const { data } = await $host.patch('/notes/archive/' + id)
    return data
  } catch (e) {
    console.error('Error toggling archive on server:', e)
    throw e
  }
}

export const unArchiveOnServer = async (id: string) => {
  try {
    const { data } = await $host.patch('/notes/unarchive/' + id)
    return data
  } catch (e) {
    console.error('Error toggling archive on server:', e)
    throw e
  }
}

export const fetchAllNotes = async () => {
  try{
    const { data } = await $host.get('/notes')
    return data
  } catch (e) {
    console.error('Error fetching notes:', e)
    return null
  }
}
export const fetchStats = async () => {
  try{
    const { data } = await $host.get('/notes/stats/all')
    return data
  } catch (e) {
    console.error('Error fetching stats:', e)
    return null
  }
}