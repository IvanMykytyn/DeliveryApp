//models
import Order from '../models/Order.js'

const orderController = async (req, res) => {
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
export { orderController }
