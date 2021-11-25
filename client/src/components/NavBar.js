import React, { useContext } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts'

import { Button, Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	return (
		<Navbar bg='dark' variant='dark' className='d-flex justify-content-between'>
			<Container>
				<NavLink style={{ color: 'white' }} to={SHOP_ROUTE} className='p-2'>
					КупиДевайс
				</NavLink>
				{user.isAuth ? (
					<Nav style={{ color: 'white' }} className='p-2'>
						<Button variant={'outline-light'} className='me-2'>
							Админ панель
						</Button>
						<Button variant={'outline-light'} className='me-2'>
							Войти
						</Button>
					</Nav>
				) : (
					<Nav style={{ color: 'white' }} className='p-2'>
						<Button variant={'outline-light'} className='me-2'>
							Админ панель
						</Button>
						<Button variant={'outline-light'} className='me-2' onClick={() => user.setIsAuth(true)}>
							Авторизация
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})

export default NavBar
