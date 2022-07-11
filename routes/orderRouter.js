import express from 'express'
const router = express.Router()

import {storeOrder, getOrders} from '../controllers/orderController.js'
router.route('/').post(storeOrder).get(getOrders)

export default router