import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import ListGroup from 'react-bootstrap/ListGroup'

const TypeBar = observer(() => {
	const { device } = useContext(Context)
	return (
		<ListGroup className='shadow-sm p-2 mt-2 bg-white rounded'>
			{device.types.map((type) => (
				<ListGroup.Item
					className='border-0 rounded'
					style={{ cursor: 'pointer' }}
					active={type.id === device.selectedType.id}
					key={type.id}
					onClick={() => device.setSelectedType(type)}>
					{type.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
})

export default TypeBar
