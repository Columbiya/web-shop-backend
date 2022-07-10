import ApiError from "../error/ApiError.js"
import models from "../models/models.js"

class BrandController {
    async getBrands(req, res) {
        const brands = await models.Brand.findAll()

        return res.json(brands)
    }

    async createBrand(req, res, next) {
        const { name } = req.body

        if (!name) {
            return next(ApiError.badRequest("Не указано имя брэнда"))
        }

        const brand = await models.Brand.create({ name })
        return res.json(brand)
    }

    async deleteBrand(req, res, next) {
        try {
            const { id } = req.body

            if (!id) {
                return next(ApiError.badRequest('Не указан id брэнда, который нужно удалить'))
            }

            const deletedBrand = await models.Brand.findOne({where: {id}})
            
            if (!deletedBrand) {
                return next(ApiError.badRequest('Типа с таким id не существует'))
            }

            await deletedBrand.destroy()
            res.json(deletedBrand)
        } catch(e) {
            next(ApiError.internal('Произошла какая то непредвиденная ошибка. Попробуйте снова через некоторое время'))
        }
    }
}

export default new BrandController()