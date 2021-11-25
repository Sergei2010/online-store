import React from 'react'
import { Container, Col, Image, Row, Card, Button } from 'react-bootstrap'
import imgApple from '../assets/apple-12.png'
import bigStar from '../assets/bigStar.png'

const DevicePage = () => {
	const device = { id: 1, name: 'Iphone 12 pro', price: 25000, rating: 5, img: imgApple }
	const description = [
		{ id: 1, title: 'Операционная память', description: '5 гб' },
		{ id: 2, title: 'Камера', description: '12 МП' },
		{ id: 3, title: 'Прцессор', description: 'Пентиум 3' },
		{ id: 4, title: 'Кол-во ядер', description: '2' },
		{ id: 5, title: 'Аккумулятор', description: '4000' }
	]
	return (
		<Container className='mt-2'>
			<Row>
				<Col md={4}>
					<Image width={300} height={300} src={device.img} />
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
						<Button variant={'outline-dark'}>Добавить в корзину</Button>
					</Card>
				</Col>
			</Row>
			<Row className='d-flex flex-column m-3'>
				<h1>Характеристики</h1>
				{description.map((info, index) => (
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
