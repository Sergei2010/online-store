const { Basket, BasketDevice } = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
	async create(req, res, next) {
		const { userId } = req.body
		const basket = await Basket.create({ userId })
		return res.json(basket)
	}
	async add(req, res) {
		let baskets
		baskets = await Basket.findAndCountAll()
		return res.json(baskets)
	}
	async getOne(req, res) {
		const { id } = req.params
		const basket = await Basket.findOne({
			where: { id }
		})
		return res.json(basket)
	}
}

module.exports = new BasketController()
