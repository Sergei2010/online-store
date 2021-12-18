import { $authHost } from './index'

// создаю basket при регистрации user
export const createBasket = async (basket) => {
	const { data } = await $authHost.post('api/basket', basket)
	console.log('data--after--API: ', data)
	return data
}

// добавить device в корзину
export const addDevice = async (device) => {
	const { data } = await $authHost.post('api/basket', device)
	return data
}
