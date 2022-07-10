import ApiError from '../error/ApiError.js'
import models from '../models/models.js'

class BasketController {
    async putDeviceIntoBasket(req, res, next) {
        try {
            const user = req.user
            const { id: deviceId }= req.body

            if (!deviceId) {
                return next(ApiError.badRequest('Не указан id девайса, который нужно добавить в корзину'))
            }
    
            const basket = await models.Basket.findOne({where: {userId: user.id}})
            const deviceInBasket = await models.BasketDevice.create({basketId: basket.id, deviceId})
    
            return res.json(deviceInBasket)
        } catch(e) {
            return next(ApiError.internal('Произошла какая то непредвиденная ошибка, попробуйте снова через некоторое время'))
        }
    }

    async deleteDeviceFromBasket(req, res, next) {
        try {
            const user = req.user
            const { id: deviceId }= req.body

            if (!deviceId) {
                return next(ApiError.badRequest('Не указан id девайса, который нужно удалить из корзины'))
            }
    
            const basket = await models.Basket.findOne({where: {userId: user.id}})
            const deviceInBasket = await models.BasketDevice.findOne({where: {basketId: basket.id, deviceId}})

            await deviceInBasket.destroy()
            return res.json(deviceInBasket)
        } catch(e) {

        }
    }
}

export default new BasketController()