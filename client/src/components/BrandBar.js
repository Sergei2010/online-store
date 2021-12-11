import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Card } from 'react-bootstrap'

const BrandBar = observer(() => {
	const { device } = useContext(Context)
	return (
		<div className='d-flex flex-wrap justify-content-between mt-2 shadow-sm p-2 bg-white'>
			{device.brands.map((brand) => (
				<Card
					className='p-1'
					style={{ cursor: 'pointer' }}
					key={brand.id}
					onClick={() => device.setSelectedBrand(brand)}
					border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}>
					{brand.name}
				</Card>
			))}
		</div>
	)
})

export default BrandBar
