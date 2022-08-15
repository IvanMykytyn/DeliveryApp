import mongoose from 'mongoose'
import validator from 'validator'

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide userId'],
  },
  address: { type: String, required: [true, 'Please provide address'] },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: [2, 'Name is too short'],
    maxlength: [20, 'Name is too long'],
    trim: true,
    // match
    validate: {
      validator: (name) => !/\d+/g.test(name),
      message: 'Please provide a valid name',
    },
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone'],
    match: [/^\d+$/, 'Wrong Phone number Type'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please provide total amount'],
    min: [0, 'Min value is 0'],
    max: [150, 'Max value is 150'],
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  total: {
    type: Number,
    required: [true, 'Please provide total price'],
    min: [0, 'Min value is 0'],
    max: [1500, 'Max value is 1500'],
  },
  cart: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide good id'],
      },
      amount: {
        type: Number,
        required: [true, 'Please provide good amount'],
        min: [0, 'Min value is 0'],
        max: [150, 'Max value is 150'],
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value',
        },
      },
    },
  ],
})

export default mongoose.model('Order', OrderSchema)
