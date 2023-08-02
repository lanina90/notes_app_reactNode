import {ChangeEvent, FC, FormEvent, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {createDate, getDatesFromString} from "../../utils/helperFunctions"
import {useAppDispatch} from "../../hooks"
import {createNewNote, fetchStatistics} from "../../store/notesSlice"
import Button from "../../UIKit/Button";
import Input from "../../UIKit/Input";
import Select from "../../UIKit/Select";

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
    <section className="m-5">
      <form onSubmit={createNoteHandler}>
        <Input
          labelName={'Name'}
          value={value.title}
          onChange={handleChange}
          type="text"
          id="title"
          name="title"
        />
        <Select
          labelName={'Category'}
          value={value.category}
          onChange={handleChange}
          name={"category"}
          options={["Task", "Random Thought", "Idea", "Quote" ]}/>
        <Input
          labelName={'Notes'}
          value={value.content}
          onChange={handleChange}
          type="text"
          id="content"
          name="content"
        />
        <Button
          className="['h-9', 'cursor-pointer', 'rounded-sm', 'p-1', 'border-2', 'border-my-grey']"
          type="submit"
          label="Add Note"
        />
      </form>
    </section>
  )
}

export default CreateNoteForm