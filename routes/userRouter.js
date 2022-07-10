import { Router } from "express";
import userController from "../controllers/userContoller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";


const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login) //добавить delete
router.get('/', authMiddleware, checkRoleMiddleware('ADMIN'), userController.getAllUsers)
router.delete('/', authMiddleware, checkRoleMiddleware('ADMIN'), userController.deleteUser)
router.get('/auth', authMiddleware, userController.check) 

export default router