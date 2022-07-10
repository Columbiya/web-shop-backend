import { Router } from "express";
import typeController from '../controllers/typeController.js'
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";


const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), typeController.createType)
router.delete('/', checkRoleMiddleware('ADMIN'), typeController.deleteType)
router.get('/', typeController.getType) //добавить delete

export default router