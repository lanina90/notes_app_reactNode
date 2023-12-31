
import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import {router} from './routes'


const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/api/notes', router)


const port = process.env.PORT || '8000'
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`)
})

export default app
