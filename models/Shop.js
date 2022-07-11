import mongoose from 'mongoose'

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
  }
})

export default mongoose.model('Shop', ShopSchema)
