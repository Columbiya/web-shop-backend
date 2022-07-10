import { v4 as uuidv4} from 'uuid'
import models from '../models/models.js'
import path from 'path'
import ApiError from '../error/ApiError.js'

class DeviceController {
    async getDevices(req, res, next) {
        try {
            let {brandId, typeId, limit, page} = req.query
            page = page || 1
            limit = limit || 9
            console.log(limit, page);
            let offset = page * limit - limit
            let devices;
            if (!brandId && !typeId) {
                devices = await models.Device.findAndCountAll({limit, offset}) //findAndCountAll чтобы знать общее количество итемов по заданному запросу
            }
            if (brandId && !typeId) {
                devices = await models.Device.findAndCountAll({where: {brandId: brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                devices = await models.Device.findAndCountAll({where: {typeId: typeId}, limit, offset})
            }
            if (brandId && typeId) {
                devices = await models.Device.findAndCountAll({where: {typeId: typeId, brandId: brandId}, limit, offset}) 
            }
            return res.json(devices)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOneDevice(req, res, next) {
        try {
            const { id } = req.params
            const device = await models.Device.findOne({
                where: {id: id},
                include: [{model: models.DeviceInfo, as: 'info'}]
            })
            return res.json(device)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createDevice(req, res, next) {
        const __dirname = path.resolve()

        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuidv4() + ".jpg"
            img.mv(path.resolve(__dirname, 'static', fileName))
            const device = await models.Device.create({ name, price, brandId, typeId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    models.DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }
    
            return res.json(device)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteDevice(req, res, next) {
        try {
            const { id } = req.params
        
            const candidate = models.Device.findOne({where: {id}})

            if (!candidate) {
                return next(ApiError.badRequest('Такого девайса по указанному id не существует'))
            }

            await candidate.destroy()
            return res.json(candidate)
        } catch(e) {
            next(ApiError.internal('Произошла какая то внутренняя ошибка, попробуйте снова через некоторое время'))
        }
    }
}
 
export default new DeviceController()