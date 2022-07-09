import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

// log http requests
import morgan from 'morgan'

// db
import connectDB from './db/connect.js'
import Good from './models/Good.js'
// router
import authRouter from './routes/authRouter.js'
import shopRouter from './routes/shopRouter.js'
import goodRouter from './routes/goodRouter.js'
import orderRouter from './routes/orderRouter.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/auth', authRouter)
app.use('/shops', shopRouter)
app.use('/goods', goodRouter)
app.use('/order', orderRouter)


app.post('/upload', async (req, res) => {
  console.log('createitem', req.body)

  const goodItem = new Good(req.body)

  try {
    await goodItem.save()
    res.status(201).json(goodItem)
  } catch (error) {
    console.log(error)
  }
})
app.get('/getsomething', async (req, res) => {
  console.log('get items')
  try {
    const goods = await Good.find()

    res.status(200).json(goods)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})
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
