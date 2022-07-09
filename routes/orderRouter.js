import express from 'express'
const router = express.Router()

import {orderController} from '../controllers/orderController.js'
router.route('/').post(orderController)

export default router