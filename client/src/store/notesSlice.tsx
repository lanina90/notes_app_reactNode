import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {fetchAllNotes, createNote, deleteNote, editNote, toggleArchiveOnServer} from "../services/api";

export type NoteType = {
  id: string
  title: string
  category: string
  content: string
  created: string
  dates: string
  archived: boolean
}

export type NoteEditType = {
  id: string
  title: string
  category: string
  content: string
  dates: string
}

type NotesStateType = {
  notes: NoteType[]
}

const initialState: NotesStateType = {
  notes: []
}

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async () => {
    return await fetchAllNotes()
  }
);

export const createNewNote = createAsyncThunk(
  "notes/createNewNote",
  async (noteData: NoteType) => {
    try{
      return await createNote(noteData);
    } catch (e) {
      console.log('createNewNote', e)
    }
  }
);

export const deleteOneNote = createAsyncThunk(
  "notes/deleteOneNote",
  async (id: string) => {
    try{
      return await deleteNote(id);
    } catch (e) {
      console.log('createNewNote', e)
    }
  }
);

export const editOneNote = createAsyncThunk(
  "notes/editOneNote",
  async (noteData: NoteType) => {
    try{
      return await editNote(noteData.id, noteData)
    } catch (e) {
      console.log('createNewNote', e)
    }
  }
);

export const toggleArchiveNote = createAsyncThunk(
  'notes/toggleArchiveNote',
  async ({ id, archived }: { id: string, archived: boolean }) => {
    try {
      const response = await toggleArchiveOnServer(id, !archived);
      return response.data;
    } catch (e) {
      console.error('Error toggling archive:', e);
      throw e;
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
    })
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload.flat();
    })
    builder.addCase(deleteOneNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    })
    builder.addCase(editOneNote.fulfilled, (state, action) => {
      const {id, title, category, content, dates} = action.payload
      const noteToEdit = state.notes.find((note) => note.id === id)
      if (noteToEdit) {
        noteToEdit.title = title
        noteToEdit.category = category
        noteToEdit.content = content
        noteToEdit.dates = dates
      }
    })
    builder.addCase(toggleArchiveNote.fulfilled, (state, action) => {
      const id = action.payload;
      const noteToToggle = state.notes.find((note) => note.id === id);
      if (noteToToggle) {
        noteToToggle.archived = !noteToToggle.archived;
      }
    });
  },
})



export default notesSlice.reducer