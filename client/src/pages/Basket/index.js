import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../index'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { fetchDevices, fetchBrands, fetchTypes } from '../../http/deviceAPI'
import { deleteDeviceFromBasket } from '../../http/basketAPI'
import './style.css'

const Basket = observer(() => {
	const { user } = useContext(Context)
	const { device } = useContext(Context)
	let ids = toJS(user.devices).filter(function (id) {
		return id !== null // исключаю нулевые значения id
	})
	// console.log('device--in--basket: ', ids)
	const count = (item) => {
		return ids.filter((id) => id === item).length
	}
	// ниже добавлю ключ "count" в объект device
	// console.log('count--for--device: ', count(55))
	const [devices, setDevices] = useState([])
	const [types, setTypes] = useState([])
	const [brands, setBrands] = useState([])
	useEffect(() => {
		fetchTypes().then((data) => setTypes(data))
		fetchBrands().then((data) => setBrands(data))
		fetchDevices(null, null, 1, device.totalCount)
			.then((data) => {
				return Object.values(data.rows)
			})
			.then((data) => {
				return data.filter((device) => {
					device.count = count(device.id)
					return ids.includes(device.id)
				})
			})
			.then((data) => {
				setDevices(data)
				// console.log('data--in--basket: ', data)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const getBrand = (id) => {
		let result = brands.find((brand) => brand.id === id)
		// console.log('brand--in--basket: ', result.name)
		if (result) {
			// let { name } = Object.values(result)
			return result.name
		} else {
			return null
		}
	}
	const getType = (id) => {
		let result = types.find((type) => type.id === id)
		// console.log('type--in--basket: ', result.name)
		if (result) {
			// let { name } = Object.values(result)
			return result.name
		} else {
			return null
		}
	}
	const deleteFromBasket = async (user, device) => {
		const basketId = toJS(user.basketId)
		const deviceId = toJS(device.id)
		try {
			const formData = new FormData()
			formData.append('basketId', basketId)
			formData.append('deviceId', deviceId)
			// удаляю device из корзины
			await deleteDeviceFromBasket(formData)
			ids = ids.filter(function (id) {
				return id !== deviceId
				// удаляю deviceId из списка
			})
			user.setDevices(ids) // обновляю Context для User
			let data = devices.filter((device) => {
				return device.id !== deviceId
				// фильтрую массив devices
			})
			setDevices(data) // изменяю state для перерисовки страницы
		} catch (e) {
			alert(e.message)
		}
	}
	// уменьшаю кол-во товара в корзине
	const dicrementCount = (device) => {
		device.count--
		// setDevices(...devices, device.count)
		console.log('device.count--after--dicrementCount', device.count)
		console.log('devices--after--dicrementCount', devices)
		return device
	}
	// увеличиваю кол-во товара в корзине
	const incrementCount = (device) => {
		console.log('devices--before--incrementCount', devices)
		device.count++
		//find the index of object from array that you want to update
		const objIndex = devices.findIndex((obj) => obj.id === device.id)
		// make new object of updated object
		const updatedObj = { ...devices[objIndex], count: device.count }
		// make final new array of objects by combining updated object
		const updatedDevices = [
			...devices.slice(0, objIndex),
			updatedObj,
			...devices.slice(objIndex + 1)
		]
		setDevices(updatedDevices)
		console.log('device.count--after--incrementCount', device.count)
		console.log('devices--after--incrementCount', devices)
		return device
	}

	return (
		<Container>
			<div className='mt-2'>
				<h2 className='basket'>Корзина покупок</h2>
			</div>
			<Card className='d-flex flex-row justify-content-between align-items-center shadow-sm basket-card'>
				<Col className='col col-6 p-3'>Товар(ы)</Col>
				<Col className='col col-3 p-3'>Количество</Col>
				<Col className='col col-3 p-3'>Цена (за ед.)</Col>
			</Card>
			{!devices && (
				<Card className='card mt-2 d-flex justify-content-around shadow-sm pt-2 pb-2 basket-card'>
					<Row className='row no-gutters'>
						<Col className='col col-6'>
							<div className='card-body'>
								<h5 className='card-title'>Вы ещё не выбрали товары для покупки</h5>
							</div>
						</Col>
						<Col className='col col-3 d-flex flex-column justify-content-center'>
							<div
								className='btn-group-lg d-flex justify-content-around'
								role='group'
								aria-label='Basic example'>
								<button type='button' className='btn-outline-primary col-3 m-1'>
									0
								</button>
							</div>
						</Col>
						<Col className='col col-3 d-flex flex-column justify-content-center'>
							<div>
								<span>0 рублей</span>
							</div>
						</Col>
					</Row>
				</Card>
			)}
			{devices &&
				devices.map((device) => {
					return (
						<Card
							className='card mt-2 d-flex justify-content-around shadow-sm pt-2 pb-2 basket-card'
							key={device.id}>
							<Row className='row no-gutters'>
								<Col className='col col-3 d-flex justify-content-center align-items-center p-3'>
									<Image
										width={150}
										height={150}
										src={process.env.REACT_APP_API_URL + device.img}
										className='card-img3'
										alt='deviceImg'
									/>
								</Col>
								<Col className='col col-3 d-flex justify-content-around'>
									<div className='d-flex flex-column justify-content-center flex-fill'>
										<h3 className='card-title'>{device.name}</h3>
										<h5 className='card-title text-black-50'>{getBrand(device.brandId)}</h5>
										<h5 className='card-title text-black-50'>{getType(device.typeId)}</h5>
									</div>
								</Col>
								<Col className='col col-3 d-flex flex-column justify-content-center'>
									<div
										className='btn-group-lg d-flex justify-content-around'
										role='group'
										aria-label='Basic example'>
										<button
											type='button'
											className='btn-outline-primary col-3 m-1'
											onClick={() => dicrementCount(device)}>
											-
										</button>
										<button type='button' className='btn-outline-primary col-3 m-1'>
											{device.count}
										</button>
										<button
											type='button'
											className='btn-outline-primary col-3 m-1'
											onClick={() => incrementCount(device)}>
											+
										</button>
									</div>
									<Row>
										<button
											type='button'
											className='btn btn-link'
											onClick={() => deleteFromBasket(user, device)}>
											<span>Удалить</span>
										</button>
									</Row>
								</Col>
								<Col className='col col-3 d-flex flex-column justify-content-center'>
									<div>
										<h4>{device.price * device.count} рублей</h4>
									</div>
								</Col>
							</Row>
						</Card>
					)
				})}
			<hr />
			<Row>
				<Col className='col col-6'></Col>
				<Col className='col col-6'>
					<Card className='card mt-2 d-flex shadow-sm p-2 basket-card'>
						<div>Цена товара(-ов)</div>
						<div>Итого:</div>
						<Button className='btn btn-outline-primary'>Оформить заказ</Button>
					</Card>
				</Col>
			</Row>
		</Container>
	)
})

export default Basket
