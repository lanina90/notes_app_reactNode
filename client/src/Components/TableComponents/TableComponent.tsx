import React, {FC, ReactNode, useEffect, useState} from 'react'
import {getCategoryImage} from "../../utils/helperFunctions"
import {fetchStatistics, NoteType} from "../../store/notesSlice"
import EditNoteComponent from "../Forms/EditNoteComponent"
import TableRowArchived from "./TableRowArchived"
import {useAppDispatch, useAppSelector} from "../../hooks"

type TableComponentPropsType = {
  headers: ReactNode[]
  tableShowFor: string
}

const TableComponent: FC<TableComponentPropsType> = ({headers, tableShowFor}) => {
  const dispatch = useAppDispatch()
  const archivedNotes = useAppSelector(state => state.notes.notes.filter(note => note && note.archived))
  const notArchivedNotes = useAppSelector(state => state.notes.notes.filter(note => note && !note.archived))
  const stats = useAppSelector((state) => state.notes.stats)
  const [editedNoteId, setEditedNoteId] = useState<number | null>(null)
  const noteToEdit = notArchivedNotes.find((note: NoteType) => note.id! === editedNoteId!)
  const notes = useAppSelector(state => state.notes.notes)

  const handleEditNote = (id: number) => {
    setEditedNoteId(id)
  }

  useEffect(() => {
    dispatch(fetchStatistics())
    console.log('change')
  }, [dispatch, notes])

  const notesToShow = tableShowFor === 'unarchived' ? notArchivedNotes : archivedNotes

  return (
    <section>
      <table className="notes">
        <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {tableShowFor === 'unarchived' || tableShowFor === 'archived' ?
          notesToShow?.map((note: any) => (
            <TableRowArchived
              key={note.id}
              note={note}
              tableShowFor={tableShowFor}
              onEditNote={handleEditNote}/>
          )) : null}

        {tableShowFor === 'summary' &&
          (
            stats && Object.keys(stats)?.map((category) => (
              <tr key={category}>
                <td>
                  <div className="flex-container">
                    <div className="category-image">
                      <img src={getCategoryImage(category)} alt={category}/>
                    </div>
                    <div>{category}</div>
                  </div>
                </td>
                <td>{stats[category].active}</td>
                <td>{stats[category].archived}</td>
              </tr>
            ))
          )
        }
        </tbody>
      </table>
      {noteToEdit && (
        <EditNoteComponent
          note={noteToEdit}
          setEditedNoteId={() => setEditedNoteId(null)}
        />
      )}
    </section>
  )
}

export default TableComponent