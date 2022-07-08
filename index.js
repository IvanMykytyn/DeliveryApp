import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

// log http requests
import morgan from 'morgan'

// db
import connectDB from './db/connect.js'

// router
import authRouter from './routes/authRouter.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/auth', authRouter);

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
