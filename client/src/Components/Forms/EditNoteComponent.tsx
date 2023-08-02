import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react'
import {getDatesFromString} from "../../utils/helperFunctions"
import {editOneNote, NoteType} from "../../store/notesSlice"
import {useAppDispatch} from "../../hooks"
import Button from "../../UIKit/Button";
import Select from "../../UIKit/Select";
import Input from "../../UIKit/Input";

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
    }))

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
        <Input labelName={"Title"} value={value.title} onChange={handleChange} type={"text"} id={"title"}
               name={"title"}/>
        <Input labelName={"Content"} value={value.content} onChange={handleChange} type={"text"} id={"content"}
               name={"content"}/>
        <Select labelName={"Category"} value={value.category} onChange={handleChange} name={"category"}
                options={["Task", "Random Thought", "Idea", "Quote"]}/>

        <Button type={'submit'} label={'Save'}/>
      </form>
    </section>
  )
}

export default EditNoteComponent