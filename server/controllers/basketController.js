const { Basket, BasketDevice } = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
	// создаю BasketDevice
	async create(req, res, next) {
		const { userId, basketId, deviceId } = req.body
		if (!basketId || !deviceId || !userId) {
			return next(ApiError.badRequest('Некорректные данные для товара корзины'))
		}
		const basketDevice = await BasketDevice.create({ userId, basketId, deviceId })
		return res.json(basketDevice)
	}
	// ищу одну корзину по внешнему ключю userId
	async getOne(req, res, next) {
		const { id } = req.query
		// if (!id) {
		// 	return next(ApiError.badRequest('Очень некорректные данные для пользователя'))
		// }
		const basket = await Basket.findOne({ where: { userId: id } })
		return res.json(basket)
	}
	// ищу все BasketDevices
	async getAll(req, res, next) {
		const { basketId } = req.query
		if (!basketId) {
			return next(ApiError.badRequest('Некорректные данные для пользователя'))
		}
		const basketDevices = await BasketDevice.findAndCountAll({ where: { basketId } })
		return res.json(basketDevices)
	}
}

module.exports = new BasketController()
