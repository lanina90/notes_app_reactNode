
import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import {router} from './routes'
import sequelize from "./db";



const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/api/notes', router)


const port = process.env.PORT || '5000'
const start = async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => console.log(`Server started at port ${port}`))
  } catch(e: any) {
    console.error(`Failed to connect to the database. Error: ${e.message}`);
  }
}

start()

export default app
