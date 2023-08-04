import React, {FC} from 'react'
import {getCategoryImage, trimText} from "../../utils/helperFunctions"
import {archiveNote, deleteOneNote, fetchNotes, fetchStatistics, NoteType, unArchiveNote} from "../../store/notesSlice"
import {useAppDispatch} from "../../hooks"

type TableRowArchivedType = {
  note: NoteType
  tableShowFor: string
  onEditNote: ((open: string) => void)
}

const TableRowArchive: FC<TableRowArchivedType> = ({
                                                                                     note,
                                                                                     tableShowFor,
                                                                                     onEditNote
                                                                                   }) => {

  const dispatch = useAppDispatch()

  const removeNoteHandler = (id: string) => {
    dispatch(deleteOneNote(id))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchNotes())
          dispatch(fetchStatistics())
        }
      })
  }

  const archiveNoteHandler = (id: string) => {
    dispatch(archiveNote({ id}))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchNotes())
          dispatch(fetchStatistics())
        }
      })
  }
  const unArchiveNoteHandler = (id: string) => {
    dispatch(unArchiveNote({ id}))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchNotes())
          dispatch(fetchStatistics())
        }
      })
  }


  return (
    <tr>
      <td>
        <div className="flex-container">
          <div className="category-image">
            <img src={getCategoryImage(note?.category)} alt={note?.category}/>
          </div>
          <div>{trimText(note.title, 20)}</div>
        </div>
      </td>
      <td>{note?.created}</td>
      <td>{note?.category}</td>
      <td>{trimText(note.content, 20)}</td>
      <td>{note.dates}</td>
      {tableShowFor === 'archived' ? (
        <td>
          <div onClick={() => unArchiveNoteHandler(note.id)} className="pic unarchive"/>
        </td>
      ) : (
        <>
          <td>
            <div onClick={() => onEditNote(note.id)} className="pic edit" />
          </td>
          <td>
            <div onClick={() => archiveNoteHandler(note.id )} className="pic archive"/>
          </td>
          <td>
            <div onClick={() => removeNoteHandler(note.id)} className="pic remove"/>
          </td>
        </>
      )}
    </tr>
  )
}

export default TableRowArchive