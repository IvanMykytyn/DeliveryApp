import express from 'express'
const router = express.Router()

import {goodController} from '../controllers/goodController.js'

router.route('/:shopId').get(goodController)

export default router