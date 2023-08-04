import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {
  fetchAllNotes,
  createNote,
  deleteNote,
  editNote,
  fetchStats,
  archiveOnServer, unArchiveOnServer
} from "../services/api"

export type NoteType = {
  id?: number
  title: string
  category: string
  content: string
  created: string
  dates: string
  archived: boolean
}

interface NotesStateType {
  notes: NoteType[],
  stats: any,
  isLoading: boolean
  error: any
}


const initialState: NotesStateType = {
  notes: [],
  stats: null,
  isLoading: false,
  error: null,
}

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async () => {
    return await fetchAllNotes()
  }
)

export const fetchStatistics = createAsyncThunk(
  'notes/fetchStatistics',
  async () => {
    try {
      return await fetchStats()
    } catch (e) {
      console.error('Error toggling archive:', e)
      throw e
    }
  }
)


export const createNewNote = createAsyncThunk(
  "notes/createNewNote",
  async (noteData: NoteType) => {
    try{
      return await createNote(noteData)
    } catch (e) {
      console.log('createNewNote', e)
    }
  }
)

export const deleteOneNote = createAsyncThunk(
  "notes/deleteOneNote",
  async (id: number) => {
    try{
      return await deleteNote(id)
    } catch (e) {
      console.log('createNewNote', e)
    }
  }
)

export const editOneNote = createAsyncThunk(
  "notes/editOneNote",
  async (noteData: NoteType) => {
    try{
      return await editNote(noteData.id!, noteData)
    } catch (e) {
      console.log('createNewNote', e)
    }
  }
)

export const archiveNote = createAsyncThunk(
  'notes/archiveNote',
  async ({ id}: { id: number}) => {
    try {
      return await archiveOnServer(id)
    } catch (e) {
      console.error('Error toggling archive:', e)
      throw e
    }
  }
)

export const unArchiveNote = createAsyncThunk(
  'notes/unArchiveNote',
  async ({ id }: { id: number}) => {
    try {
      return await unArchiveOnServer(id)
    } catch (e) {
      console.error('Error toggling archive:', e)
      throw e
    }
  }
)



const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewNote.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createNewNote.fulfilled, (state, action) => {
      const newNote = action.payload
      state.notes.push(newNote);
      state.isLoading = false
    })
    builder.addCase(createNewNote.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(fetchNotes.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload.flat()
      state.isLoading = false

    })
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(deleteOneNote.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteOneNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload)
      state.isLoading = false
    })
    builder.addCase(deleteOneNote.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(editOneNote.pending, (state) => {
      state.isLoading = true
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
      state.isLoading = false
    })
    builder.addCase(editOneNote.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(archiveNote.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(archiveNote.fulfilled, (state, action) => {
      const id = action.payload
      const noteToToggle = state.notes.find((note) => note.id === id)
      if (noteToToggle) {
        noteToToggle.archived = true
      }
      state.isLoading = false
    })
    builder.addCase(archiveNote.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(unArchiveNote.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(unArchiveNote.fulfilled, (state, action) => {
      const id = action.payload
      const noteToToggle = state.notes.find((note) => note.id === id)
      if (noteToToggle) {
        noteToToggle.archived = false
      }
      state.isLoading = false
    })
    builder.addCase(unArchiveNote.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(fetchStatistics.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.stats = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchStatistics.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})


export default notesSlice.reducer