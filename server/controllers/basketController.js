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
	// удаляю device из корзины
	async destroy(req, res, next) {
		const { basketId, deviceId } = req.body
		if (!basketId || !deviceId) {
			return next(ApiError.badRequest('Некорректные данные для товара корзины'))
		}
		// удаляю BasketDevice по basketId и deviceId
		const basketDevice = await BasketDevice.destroy({
			where: { basketId, deviceId }
		})
		return res.json(basketDevice)
	}
	// ищу одну корзину по внешнему ключю userId
	async getOne(req, res, next) {
		const { id } = req.query
		if (!id) {
			return next(ApiError.badRequest('Некорректные данные для пользователя'))
		}
		let basketData = []
		const basket = await Basket.findOne({
			where: { userId: id }
		})
		const basketDevice = await BasketDevice.findAll({
			where: { basketId: basket.id }
		})
		basketData.push(basket.id)
		basketData.push(
			basketDevice.map((i) => {
				return i.deviceId
			})
		)
		return res.json(basketData)
	}
}

module.exports = new BasketController()
