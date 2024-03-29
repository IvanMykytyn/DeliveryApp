import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

//models
import User from '../models/User.js'

// utils
import errorHandler from '../utils/error-handler.js'

const register = async (req, res) => {
  try {
    // Get user input
    const { name, email, password } = req.body

    if (!name) {
      return res.status(400).json({ message: 'all input is required' })
    }

    let user = await User.create({ name, email, password })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })

    user.password = undefined

    res.status(201).json({ user, token })
  } catch (error) {
    errorHandler(res, error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(404).send({ message: 'Invalid password or email' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(404).send({ message: 'Invalid password or email' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })
    user.password = undefined

    res.status(201).json({ user, token })
  } catch (error) {
    errorHandler(res, error)
  }
}

export { register, login }
