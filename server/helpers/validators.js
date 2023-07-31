
const yup = require('yup');

const noteSchema  = yup.object({
  id: yup.string().required(),
  title: yup.string().required(),
  created: yup.string().required(),
  category: yup.string().required(),
  content: yup.string().required(),
  dates: yup.string().notRequired(),
  archived: yup.boolean().required(),
});

module.exports = noteSchema