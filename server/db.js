const { Sequelize } = require('sequelize') // Подключение к БД

module.exports = new Sequelize( // Модель сообщает Sequelize несколько вещей о сущности (entity)
	process.env.DB_NAME, // Названеи БД
	process.env.DB_USER, // Пользователь
	process.env.DB_PASSWORD, // Пароль
	{
		dialect: 'postgres',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	}
)
