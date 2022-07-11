//models
import Order from '../models/Order.js'
import Good from '../models/Good.js'

const storeOrder = async (req, res) => {
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
}

const getOrders = async (req, res) => {

  const tempVariable = req.user.userId;
  let orders = await Order.find({ userId: tempVariable })

  let ordersToResponse = []

  for (var i = 0; i < orders.length; i++) {
    let goodsToResponse = []

    for (var j = 0; j < orders[i].cart.length; j++) {
      const good = await Good.findOne({ _id: orders[i].cart[j] })
      goodsToResponse.push({ amount: orders[i].cart[j].amount, good})
    }

    const {amount,total} = orders[i]
    ordersToResponse.push({
      amount, total,
      cart: goodsToResponse,
    })
  }
  ordersToResponse.reverse()
  res.status(200).json(ordersToResponse)
}

export { storeOrder, getOrders }
