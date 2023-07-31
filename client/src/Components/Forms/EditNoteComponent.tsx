import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react'
import {getDatesFromString} from "../../utils/helperFunctions"
import {editOneNote, NoteType} from "../../store/notesSlice"
import {useAppDispatch} from "../../hooks"

type EditNoteComponentPropsType = {
  note: NoteType
  setEditedNoteId: (() => void)
}
const EditNoteComponent: FC<EditNoteComponentPropsType> = ({setEditedNoteId, note}) => {

  const dispatch = useAppDispatch()
  const [value, setValue] = useState({
    title: '',
    category: 'Task',
    content: '',
  })

  useEffect(() => {
    setValue({
      title: note.title,
      category: note.category,
      content: note.content,
    })
  }, [note.title, note.category, note.content,])

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    setValue((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }))
  }

  const editNoteHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(editOneNote({
      ...note,
      title: value.title,
      category: value.category,
      content: value.content,
      dates: getDatesFromString(value.content),
    }));

    setValue({
      title: '',
      category: 'Task',
      content: '',
    })

    setEditedNoteId()

  }


  return (
    <section className="edit-module">
      <form className="edit-form" onSubmit={editNoteHandler}>
        <label htmlFor="title">Title</label>
        <input
          value={value.title}
          onChange={handleChange}
          type="text"
          name="title"
        />
        <label htmlFor="content">Content</label>
        <input value={value.content}
               onChange={handleChange}
               type="text"
               name="content"/>
        <label htmlFor="category">Category</label>
        <select
          value={value.category}
          onChange={handleChange}
          name="category"
        >
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
          <option value="Quote">Quote</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </section>
  )
}

export default EditNoteComponent