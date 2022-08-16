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
    required: [true, 'Please provide Email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  name: {
    type: String,
    required: [true, 'Please provide Name'],
    minlength: [2, 'Name is too short'],
    maxlength: [20, 'Name is too long'],
    trim: true,
    validate: {
      // validate if the name not contains digits
      validator: (name) => !/[^a-z]/i.test(name),
      message: 'Please provide a valid Name',
    },
  },
  phone: {
    type: String,
    required: [true, 'Please provide Phone'],
    match: [/^\d+$/, 'Invalid phone number'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please provide total Amount'],
    min: [0, 'Min value is 0'],
    max: [150, 'Max value is 150'],
    validate: {
      // validate if the amount is Integer
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  total: {
    type: Number,
    required: [true, 'Please provide total Price'],
    min: [0, 'Min value is 0'],
    max: [1500, 'Max value is 1500'],
  },
  // an Array of goods
  cart: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide Good's id"],
      },
      amount: {
        type: Number,
        required: [true, 'Please provide Goods Amount'],
        min: [0, 'Min value is 0'],
        max: [150, 'Max value is 150'],
        validate: {
          // validate if the amount is Integer
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value',
        },
      },
    },
  ],
})

export default mongoose.model('Order', OrderSchema)
