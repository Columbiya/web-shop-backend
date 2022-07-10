import { Router } from "express";
import brandController from "../controllers/brandController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), brandController.createBrand)
router.delete('/', checkRoleMiddleware('ADMIN'), brandController.deleteBrand)
router.get('/', brandController.getBrands) //добавить delete

export default router