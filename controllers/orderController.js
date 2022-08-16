//models
import Order from '../models/Order.js'
import Good from '../models/Good.js'

// utils
import errorHandler from '../utils/error-handler.js'

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
    const { userId } = req.user
    let orders = await Order.find({ userId })

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
    errorHandler(res, error)
  }
}

export { storeOrder, getOrders }
