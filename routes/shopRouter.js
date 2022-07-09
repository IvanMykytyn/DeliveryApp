import express from 'express'
const router = express.Router()

import {shopsController} from '../controllers/shopController.js'
router.route('/').get(shopsController)

export default router