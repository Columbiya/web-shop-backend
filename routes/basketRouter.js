import { Router } from 'express'
import basketController from '../controllers/basketController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.put('/', authMiddleware, basketController.putDeviceIntoBasket)
router.delete('/', authMiddleware, basketController.deleteDeviceFromBasket)

export default router