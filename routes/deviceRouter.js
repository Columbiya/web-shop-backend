import { Router } from "express";
import deviceController from '../controllers/deviceController.js'
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import ratingRouter from './ratingRouter.js'

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), deviceController.createDevice)
router.get('/', deviceController.getDevices) 
router.delete('/:id', authMiddleware, checkRoleMiddleware('ADMIN'), deviceController.deleteDevice)
router.get('/:id', deviceController.getOneDevice) //добавить delete

router.use('/', ratingRouter)

export default router