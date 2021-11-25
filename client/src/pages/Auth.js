import React from 'react'
import { Container, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'

const Auth = () => {
	const location = useLocation()
	const isLogin = location.pathname === LOGIN_ROUTE
	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{
				height: window.innerHeight - 54
			}}>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control placeholder='Введите ваш email' className='mt-3' />
					<Form.Control placeholder='Введите пароль' className='mt-3' />
				</Form>
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
					<Button className='col-4' variant={'outline-success'}>
						{isLogin ? 'Войти' : 'Регистрация'}
					</Button>
				</div>
			</Card>
		</Container>
	)
}

export default Auth
