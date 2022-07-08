import './login.styles.scss'

import React from 'react'
import { useState, useEffect } from 'react'

// components
import { FormInput, SubmitButton } from '../../components'

// router-dom
import { Link, useNavigate } from 'react-router-dom'

// app context
import { useAppContext } from '../../context/appContext'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, setupUser } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values
    if (!email || !password) {
      return
    }
    const currentUser = { email, password }

    setupUser({
      currentUser,
      endPoint: 'login',
    })
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <div className="login">
      <div className="login__container">
        <header>
          <h1>Login</h1>
        </header>
        <form className="login__form" onSubmit={onSubmit}>
          <FormInput
            type="email"
            name={'email'}
            value={values.email}
            onChange={handleChange}
            label={'Email'}
            // error={}
          />
          <FormInput
            type="password"
            name={'password'}
            value={values.password}
            onChange={handleChange}
            label={'Password'}
            // error={}
          />

          <SubmitButton text="submit" />
          <p className="login__form-membership">
            Not a member yet? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
