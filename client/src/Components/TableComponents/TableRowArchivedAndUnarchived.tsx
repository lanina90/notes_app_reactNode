import React, {FC} from 'react'
import {getCategoryImage, trimText} from "../../utils/helperFunctions"
import {deleteOneNote, fetchNotes, NoteType, toggleArchiveNote} from "../../store/notesSlice"
import {useAppDispatch} from "../../hooks"

type TableRowArchivedAndUnarchivedPropsType = {
  note: NoteType
  tableShowFor: string
  onEditNote: ((open: string) => void)
}

const TableRowArchivedAndUnarchived: FC<TableRowArchivedAndUnarchivedPropsType> = ({
                                                                                     note,
                                                                                     tableShowFor,
                                                                                     onEditNote
                                                                                   }) => {

  const dispatch = useAppDispatch()

  const removeNoteHandler = (id: string) => {
    dispatch(deleteOneNote(id))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchNotes());
        }
      });
  };

  const toggleNoteHandler = (id: string, archived: boolean) => {
    dispatch(toggleArchiveNote({ id, archived}))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchNotes());
        }
      });
  };


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
          <div onClick={() => toggleNoteHandler(note.id, note.archived )} className="pic unarchive"/>
        </td>
      ) : (
        <>
          <td>
            <div onClick={() => onEditNote(note.id)} className="pic edit" />
          </td>
          <td>
            <div onClick={() => toggleNoteHandler(note.id, note.archived )} className="pic archive"/>
          </td>
          <td>
            <div onClick={() => removeNoteHandler(note.id)} className="pic remove"/>
          </td>
        </>
      )}
    </tr>
  )
}

export default TableRowArchivedAndUnarchived