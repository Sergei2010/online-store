import React, { useContext, useState } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { Button, FormControl } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const { device } = useContext(Context)
	const [value, setValue] = useState('')
	const history = useHistory()
	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
	}
	const handleSearch = (e) => {
		device.setSearchValue(value)
		history.push(SHOP_ROUTE)
		setValue('')
	}
	return (
		<Navbar bg='dark' variant='dark' className='d-flex justify-content-between'>
			<Container>
				<NavLink
					style={{ color: 'white' }}
					to={SHOP_ROUTE}
					className='p-2'
					onClick={() => {
						device.setSearchValue('')
					}}>
					КупиДевайс
				</NavLink>
				<Nav style={{ color: 'white' }} className='p-2 col-4'>
					<FormControl
						className='border border-light me-2'
						style={{ background: 'black', color: 'white' }}
						placeholder='Введите наименование товара'
						value={value}
						onChange={(e) => {
							setValue(e.target.value)
						}}
					/>
					<Button variant={'outline-light'} className='me-2' onClick={() => handleSearch()}>
						Найти
					</Button>
				</Nav>
				{user.isAuth ? (
					<Nav style={{ color: 'white' }} className='p-2'>
						<Button
							variant={'outline-light'}
							className='me-2'
							onClick={() => history.push(ADMIN_ROUTE)}>
							Админ панель
						</Button>
						<Button variant={'outline-light'} className='me-2' onClick={() => logOut()}>
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
