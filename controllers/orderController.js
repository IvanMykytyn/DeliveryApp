//models
import Order from '../models/Order.js'
import Good from '../models/Good.js'

const errorHandler = (res, err) => {
  let message = err.message

  // handle validation errors
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
  }

  // handle unique field error
  if (err.code && err.code === 11000) {
    message = `${Object.keys(err.keyValue)} field has to be unique`
  }

  res.status(404).send({ message })
}

const storeOrder = async (req, res) => {
  try {
    const { user, order } = req.body

    const { name, email, phone, address, _id } = user
    const { total, amount, cart } = order

    const createdOrder = await Order.create({
      userId: _id,
      email,
      phone,
      address,
      name,
      amount,
      total,
      cart: [...cart],
    })

    res.status(200).json({ createdOrder })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getOrders = async (req, res) => {
  try {
    const tempVariable = req.user.userId
    let orders = await Order.find({ userId: tempVariable })

    let ordersToResponse = []

    for (let i = 0; i < orders.length; i++) {
      let goodsToResponse = []

      for (let j = 0; j < orders[i].cart.length; j++) {
        const good = await Good.findOne({ _id: orders[i].cart[j] })
        goodsToResponse.push({ amount: orders[i].cart[j].amount, good })
      }

      const { amount, total } = orders[i]
      ordersToResponse.push({
        amount,
        total,
        cart: goodsToResponse,
      })
    }
    ordersToResponse.reverse()
    res.status(200).json(ordersToResponse)
  } catch (error) {
    res.status(404).send({ message: SyntaxError })
  }
}

export { storeOrder, getOrders }
