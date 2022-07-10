import ApiError from "../error/ApiError.js"
import models from '../models/models.js'

class TypeController {
    async getType(req, res) {
        const types = await models.Type.findAll()
        return res.json(types)
    }

    async createType(req, res, next) {
        const { name } = req.body

        if (!name) {
            return next(ApiError.badRequest('Не указано название типа продукта'))
        }

        const type = await models.Type.create({ name })
        return res.json(type)
    }

    async deleteType(req, res, next) {
        try {
            const { id } = req.body
    
            if (!id) {
                return next(ApiError.badRequest('Не указан id типа, который нужно удалить'))
            }
    
            const deletedType = await models.Type.findOne({where: {id}})

            if (!deletedType) {
                return next(ApiError.badRequest('Типа с таким id не существует'))
            }

            await deletedType.destroy()
            return res.json(deletedType)
        } catch(e) {
            next(ApiError.internal('Произошла какая то внутренняя ошибка. Попробуйте снова через некоторое время'))
        }

    }
}

export default new TypeController()