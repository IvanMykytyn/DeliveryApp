import mongoose from 'mongoose'

const GoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: [3, 'Name is too short'],
    maxlength: [40, 'Name is too long'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide shopId'],
  },
  photo: {
    type: String,
    required: [true, 'Please provide photo'],
  },
})

export default mongoose.model('Good', GoodSchema)
