import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts'
import { Button, FormControl, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'
import cart_white from '../assets/cart_white.png'
import cart_black from '../assets/cart_black.png'
// import { fetchBasketDevices } from '../http/basketAPI'
// import { toJS } from 'mobx'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const { device } = useContext(Context)
	const [value, setValue] = useState('Корзина пуста')
	const [atrSrc, setAtrSrc] = useState(cart_white)
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
	const handleBasket = () => {
		console.log('Переход в корзину')
		history.push(BASKET_ROUTE)
	}
	useEffect(() => {
		setValue()
	}, [])

	return (
		<Navbar bg='dark' variant='dark' className='d-flex justify-content-around'>
			<Container>
				<NavLink
					style={{ color: 'white' }}
					to={SHOP_ROUTE}
					className='d-flex justify-content-center p-2 col-2'
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
				<Nav style={{ color: 'white' }} className='d-flex justify-content-center p-2 col-3'>
					<Button
						variant={'outline-light'}
						onClick={() => handleBasket()}
						onMouseOver={() => setAtrSrc(cart_black)}
						onMouseOut={() => setAtrSrc(cart_white)}>
						<div className='d-flex align-itens-center justify-content-between'>
							<Image src={atrSrc} width={20} height={20} className='align-self-center me-2' />
							<div>{value}</div>
						</div>
					</Button>
				</Nav>
				{user.isAuth ? (
					<Nav style={{ color: 'white' }} className='d-flex justify-content-center p-2 col-3'>
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
					<Nav style={{ color: 'white' }} className='d-flex justify-content-center p-2 col-3'>
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
