export const createDate = () : string => {
  let date = new Date()
  let options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'}
  return date.toLocaleDateString('en-US', options)
}

export const trimText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'
  } else {
    return text
  }
}

export const getDatesFromString = (str: string) => {
  const matches = str.match(/\d{1,2}\/\d{1,2}\/\d{4}/g)
  return matches ? matches.join(', ') : ''
}

export const getCategoryImage = (category: string) => {
  let categoryImage
  switch (category) {
    case "Task":
      categoryImage = "./images/task_icon.svg"
      break
    case "Random Thought":
      categoryImage = "./images/thought_icon.svg"
      break
    case "Idea":
      categoryImage = "./images/idea_icon.svg"
      break
    case "Quote":
      categoryImage = "./images/quotes_icon.svg"
      break
    default:
      categoryImage = ""
  }
  return categoryImage
}
