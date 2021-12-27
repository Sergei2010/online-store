import { $authHost } from './index'

// добавить device в корзину
export const addDeviceToBasket = async (device) => {
	const { data } = await $authHost.post('api/basket', device)
	return data
}

// ищу одну корзину
export const fetchOneBasket = async (id) => {
	const { data } = await $authHost.get('api/basket', { params: { id } })
	return data
}

// ищу все basketDevices
export const fetchBasketDevices = async (id) => {
	const { data } = await $authHost.get('api/basket/')
	return data
}
