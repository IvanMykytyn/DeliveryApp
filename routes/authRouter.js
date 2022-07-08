import express from 'express'
const router = express.Router()

import { register, login} from '../controllers/authController.js'

// middleware
import { password, email, name, inputData, alreadyExist } from '../middleware/index.js'

router.route('/register').post(inputData, alreadyExist, name, email, password, register)
router.route('/login').post(inputData, login)

export default router