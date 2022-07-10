import Express from 'express'
import sequelize from './db.js'
import models from './models/models.js'
import cors from 'cors'
import router from './routes/index.js'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'
import fileUpload from 'express-fileupload'
import path from 'path'

const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

const app = Express()
app.use(cors())
app.use(Express.json())
app.use(Express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок, последний Middleware
app.use(ErrorHandlingMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Сервер запустился на порту ${PORT}`))
    } catch(e) {
        console.log(e);
    }
}

start()