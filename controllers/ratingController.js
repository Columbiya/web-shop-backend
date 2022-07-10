import models from "../models/models.js"
import ApiError from './../error/ApiError.js';

class RatingController {
    async leaveRating(req, res, next) {
        const { deviceId, rate } = req.body
        const { id } = req.user

        if (!deviceId || !rate) {
            return next(ApiError.badRequest('Не указана нужная информация в запросе'))
        }

        const candidate = await models.Rating.findOne({where: {userId: id, deviceId}})

        if (candidate) {
            return next(ApiError.badRequest('rating к такому девайсу от такого пользователя уже существует'))
        }

        const ratingItem = await models.Rating.create({rate, userId: id, deviceId})
        return res.json(ratingItem)
    }


    async countAverage(req, res, next) {
        const { deviceId } = req.body
        const { id } = req.user

        if (!deviceId || !rate) {
            return next(ApiError.badRequest('Не указана нужная информация в запросе'))
        }

        const ratings = await models.Rating.findAll({where: {deviceId, userId: id}})

        if (!ratings || ratings.length === 0) {
            return res.json({average: 0})
        }

        let sum = 0;

        ratings.forEach(item => sum += item.rate)

        const average = Number.parseFloat(sum / ratings.length).toFixed(1)
        return res.json({average})
    }
}

export default new RatingController()