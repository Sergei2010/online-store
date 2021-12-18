import React, { useEffect, useState, useContext } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'
import { addDevice } from '../http/basketAPI'
import { Context } from '../index'

const DevicePage = () => {
	const { user } = useContext(Context)
	const [device, setDevice] = useState({ info: [] })
	const { id } = useParams()
	// const history = useHistory()
	useEffect(() => {
		fetchOneDevice(id).then((data) => {
			return setDevice(data)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const addToBasket = async () => {
		try {
			const formData = new FormData()
			formData.append('basketId', user.basket.basketId)
			formData.append('deviceId', id)
			const basketDevice = await addDevice(formData)
			console.log('basketDevice--after--addDevice: ', basketDevice)
		} catch (e) {
			alert(e.response.data.message)
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
}

export default DevicePage
