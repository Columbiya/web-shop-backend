import ApiError from "../error/ApiError.js"
import models from "../models/models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async register(req, res, next) {
        try {
            const { email, password, role } = req.body

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный Email или пароль'))
            }

            const candidate = await models.User.findOne({where: {email}})
    
            if (candidate) {
                return next(ApiError.badRequest('Такой email уже существует'))
            }

            const hash = await bcrypt.hash(password, 5)
            const newUser = await models.User.create({email, password: hash, role})
            const basket = await models.Basket.create({userId: newUser.id})
            const token = generateJwt(newUser.id, email, newUser.role)
            return res.json({token})
        } catch(e) {
            next(ApiError.badRequest('Произошла ошибка регистрации'))
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await models.User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.internal('Указан неправильный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAllUsers(req, res, next) {
        const users = models.User.findAll()
        res.json(users)
    }

    async deleteUser(req, res, next) {
        try {
            const { email } = req.body

            if (!email) {
                return next(ApiError.badRequest('Не указан email, по которому надо удалить пользователя'))
            }
    
            const user = await models.User.findOne({where: {email}})
    
            if (!user) {
                return next(ApiError.badRequest('Пользователя с таким email не существует'))
            }
    
            const usersBasket = await models.Basket.findOne({where: {userId: user.id}})
            await user.destroy()
            await usersBasket.destroy()
            return res.json(user)
        } catch(e) {
            next(ApiError.internal('Произошла непредвиденная ошибка. Попробуйте снова через некоторое время'))
        }
    }
}

export default new UserController()