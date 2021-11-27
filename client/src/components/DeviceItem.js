import React from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Card, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({ device }) => {
	const history = useHistory()
	return (
		<Col md={3} className='mt-3' onClick={() => history.push(DEVICE_ROUTE + '/' + device.idb)}>
			<Card style={{ width: 150, poiter: 'cursor', border: 'light' }}>
				<Image width={150} height={150} src={device.img} />
				<Row className='mt-1 d-flex justify-content-between align-items-center text-black-50'>
					<div>Samsung...</div>
					<div className='d-flex align-itens-center'>
						<div>{device.rating}</div>
						<Image width={10} height={10} src={star} />
					</div>
				</Row>
				<div>{device.name}</div>
			</Card>
		</Col>
	)
}

export default DeviceItem
