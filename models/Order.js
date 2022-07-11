import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  address: { type: String },
  email: { type: String },
  name: { type: String },
  phone: { type: String },
  amount: { type: Number },
  total: { type: Number },
  cart: [
    {
      goodId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      amount: { type: Number },
    },
  ],
})

export default mongoose.model('Order', OrderSchema)
