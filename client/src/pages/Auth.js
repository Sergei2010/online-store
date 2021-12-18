import React, { useState, useContext } from 'react'
import { Container, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { createBasket } from '../http/basketAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [basket, setBasket] = useState({})
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			let dataUser
			if (isLogin) {
				dataUser = await login(email, password)
			} else {
				dataUser = await registration(email, password)
				const formData = new FormData()
				formData.append('userId', dataUser.id)
				const dataBasket = await createBasket(formData)
				setBasket(dataBasket)
			}
			user.setUser(user)
			user.setIsAuth(true)
			user.setBasket(basket)
			history.push(SHOP_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{
				height: window.innerHeight - 54
			}}>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						placeholder='Введите ваш email ...'
						className='mt-3'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
						placeholder='Введите пароль ...'
						className='mt-3'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
					/>
					<div className='d-flex mt-3 justify-content-between'>
						{isLogin ? (
							<div className='col-8 d-flex align-items-center'>
								<span className='p-2'>Нет аккаунта?</span>
								<NavLink to={REGISTRATION_ROUTE}> Зарегистрируйся</NavLink>
							</div>
						) : (
							<div className='col-8 d-flex align-items-center'>
								<span className='p-2'>Есть аккаунт?</span>
								<NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
							</div>
						)}
						<Button className='col-4' variant={'outline-success'} onClick={click}>
							{isLogin ? 'Войти' : 'Регистрация'}
						</Button>
					</div>
				</Form>
			</Card>
		</Container>
	)
})

export default Auth
