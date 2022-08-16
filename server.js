import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

// log http requests
import morgan from 'morgan'

// security packages
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

// db
import connectDB from './db/connect.js'

// router
import authRouter from './routes/authRouter.js'
import shopRouter from './routes/shopRouter.js'
import goodRouter from './routes/goodRouter.js'
import orderRouter from './routes/orderRouter.js'

// middleware
import authenticateUser from './middleware/auth.js'
import notFoundMiddleware from './middleware/not-found.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// only when ready to deploy
// set static assets
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())

// helmet Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet())
// xss-clean Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.
app.use(xss())
// express-mongo-sanitize Sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(mongoSanitize())

app.use('/auth', authRouter)
app.use('/shops', authenticateUser, shopRouter)
app.use('/goods', authenticateUser, goodRouter)
app.use('/order', authenticateUser, orderRouter)

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)

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
