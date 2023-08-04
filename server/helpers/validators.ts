
import * as yup from 'yup'
export const noteSchema  = yup.object({
  title: yup.string().required(),
  created: yup.string().required(),
  category: yup.string().required(),
  content: yup.string().required(),
  dates: yup.string().notRequired(),
  archived: yup.boolean().required(),
})

export const toggleArchiveNoteSchema = yup.object().shape({
  archived: yup.boolean().required(),
});

