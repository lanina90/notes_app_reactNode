import {ChangeEvent, FC, FormEvent, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {createDate, getDatesFromString} from "../../utils/helperFunctions"
import {useAppDispatch} from "../../hooks"
import {createNewNote, fetchStatistics} from "../../store/notesSlice"

type ValueType = {
  title: string
  category: string
  content: string
}
const CreateNoteForm: FC<{ setIsCreateFromOpen: (open: boolean) => void }> = ({setIsCreateFromOpen}) => {

  const dispatch = useAppDispatch()
  const [value, setValue] =
    useState<ValueType>({
      title: '',
      category: 'Task',
      content: '',
    })

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    setValue((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }))
  }

  const createNoteHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newNote = {
      id: uuidv4(),
      title: value.title,
      category: value.category,
      content: value.content,
      created: createDate(),
      dates: getDatesFromString(value.content),
      archived: false,
    }

    dispatch(createNewNote(newNote))
    dispatch(fetchStatistics())

    setValue({
      title: '',
      category: 'Task',
      content: '',
    })

    setIsCreateFromOpen(false)
  }

  return (
    <section>
      <form onSubmit={createNoteHandler}>
        <label htmlFor="title">Name</label>
        <input
          value={value.title}
          onChange={handleChange}
          type="text"
          id="title"
          name="title"
          required/>
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
        <label htmlFor="content">Notes</label>
        <input
          value={value.content}
          onChange={handleChange}
          type="text"
          id="content"
          name="content"
          required/>
        <button type="submit">Add Note</button>
      </form>
    </section>
  )
}

export default CreateNoteForm