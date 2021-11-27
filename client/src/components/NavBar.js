import React, { useContext } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const history = useHistory()
	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
	}
	return (
		<Navbar bg='dark' variant='dark' className='d-flex justify-content-between'>
			<Container>
				<NavLink style={{ color: 'white' }} to={SHOP_ROUTE} className='p-2'>
					КупиДевайс
				</NavLink>
				{user.isAuth ? (
					<Nav style={{ color: 'white' }} className='p-2'>
						<Button
							variant={'outline-light'}
							className='me-2'
							onClick={() => history.push(ADMIN_ROUTE)}>
							Админ панель
						</Button>
						<Button variant={'outline-light'} className='me-2' onClick={() => logout()}>
							Выйти
						</Button>
					</Nav>
				) : (
					<Nav style={{ color: 'white' }} className='p-2'>
						<Button
							variant={'outline-light'}
							className='me-2'
							onClick={() => history.push(LOGIN_ROUTE)}>
							Авторизация
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})

export default NavBar
