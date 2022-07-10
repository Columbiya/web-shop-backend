import { Router } from "express";
import userRouter from './userRouter.js'
import typeRouter from './typeRouter.js'
import deviceRouter from './deviceRouter.js'
import brandRouter from './brandRouter.js'
import basketRouter from './basketRouter.js'

const router = Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter) //объединили все 4 роутера в 1
router.use('/brand', brandRouter)
router.use('/basket', basketRouter)

export default router