import jwt from 'jsonwebtoken'

export default function(role) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }

            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            
            if (decodedToken.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            next()
        } catch(e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}