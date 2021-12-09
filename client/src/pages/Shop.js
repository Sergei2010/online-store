import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi'
import Pages from '../components/Pages'

const Shop = observer(() => {
	const { device } = useContext(Context)

	useEffect(() => {
		fetchTypes().then((data) => device.setTypes(data))
		fetchBrands().then((data) => device.setBrands(data))
		fetchDevices(null, null, 1, device.limit).then((data) => {
			device.setDevises(data.rows)
			device.setTotalCount(data.count) // сколько товаров получили, поле "count" от сервера
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(
			(data) => {
				device.setDevises(data.rows)
				device.setTotalCount(data.count)
			}
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [device.page, device.selectedType, device.selectedBrand])

	return (
		<Container>
			<Row className='mt-2'>
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	)
})

export default Shop
