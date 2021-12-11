import React, { useState, useEffect } from 'react'
import { Container, Col, Image, Row, Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import bigStar from '../assets/bigStar.png'
import { fetchOneDevice } from '../http/deviceApi'
// import { useHistory } from 'react-router-dom'
// import { BASKET_ROUTE } from '../utils/consts'

const DevicePage = () => {
	const [device, setDevice] = useState({ info: [] })
	const { id } = useParams()
	// const history = useHistory()
	useEffect(() => {
		fetchOneDevice(id).then((data) => setDevice(data))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Container className='mt-2'>
			<Row>
				<Col md={4}>
					<Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
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
						<Button
							variant={'outline-dark'}
							onClick={() => {
								console.log('Go To Basket')
							}}>
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
