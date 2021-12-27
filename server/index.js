require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors') // для отправки запросов
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()
app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.send(500, 'Something broke!')
})
app.use(cors()) // отправлять запросы с браузера
app.use(express.json()) // чтобы приложение могло парсить формат "json"
// явно указываем серверу о необходимости для файлов из папки "static" раздавать как статику
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
