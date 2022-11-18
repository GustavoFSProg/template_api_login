import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const api = express()
const { PORT } = process.env

api.use(express.json())
api.use(cors())
api.use(routes)

api.listen(PORT, () => {
  console.log(` 🌄 Api Running: ${PORT}`)
})

export default api
