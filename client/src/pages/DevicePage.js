import React, { useEffect, useState, useContext } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'
import { useParams, useHistory } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'
import { addDeviceToBasket } from '../http/basketAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { SHOP_ROUTE } from '../utils/consts'
import { toJS } from 'mobx'

const DevicePage = observer(() => {
	const { user } = useContext(Context)
	if (!user) {
		console.error('Нет данных пользователя ...')
	}
	const [device, setDevice] = useState({ info: [] })
	const history = useHistory()
	const { id } = useParams()
	const userId = toJS(user.user.id)
	const basketId = toJS(user.basket.id)
	// console.log('basketId: ', basketId, 'userId: ', userId)
	useEffect(() => {
		fetchOneDevice(id).then((data) => {
			return setDevice(data) // ищу по id Device и обновляю state
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const addToBasket = async () => {
		try {
			const formData = new FormData()
			formData.append('userId', userId)
			formData.append('basketId', basketId)
			formData.append('deviceId', id)
			await addDeviceToBasket(formData) // отправляю device на сервер
			// console.log('deviceToBasket: ', deviceToBasket)
			user.setDevice(id)
			history.push(SHOP_ROUTE)
		} catch (e) {
			alert(e.message)
		}
	}

	return (
		<Container className='mt-2'>
			<Row>
				<Col md={4}>
					{device.img && (
						<Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
					)}
				</Col>
				<Col md={4}>
					<div className='d-flex flex-column align-items-center'>
						<h2>{device.name}</h2>
						<div
							className='d-flex align-items-center justify-content-center'
							style={{
								background: `url(${bigStar}) no-repeat center center`,
								width: 240,
								height: 240,
								backgroundSize: 'cover',
								fontSize: 64
							}}>
							{device.rating}
						</div>
					</div>
				</Col>
				<Col md={4}>
					<Card
						className='d-flex flex-column align-items-center justify-content-around'
						style={{ width: 300, height: 300, fontSize: 52, border: '5px solid lightgrey' }}>
						<h3>От: {device.price} руб.</h3>
						<Button variant={'outline-dark'} onClick={() => addToBasket()}>
							Добавить в корзину
						</Button>
					</Card>
				</Col>
			</Row>
			<Row className='d-flex flex-column m-3'>
				<h1>Характеристики</h1>
				{device.info.map((info, index) => (
					<Row
						key={info.id}
						style={{ background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 10 }}>
						{info.title}: {info.description}
					</Row>
				))}
			</Row>
		</Container>
	)
})

export default DevicePage
