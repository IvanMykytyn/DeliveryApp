import './login.styles.scss'
import React, { useState, useEffect } from 'react'

// components
import { FormInput, SubmitButton, Alert } from '../../components'

// React Router dom
import { Link, useNavigate } from 'react-router-dom'

// app context
import { useAppContext } from '../../context/appContext'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  // global state
  const { user, setupUser, displayAlert, showAlert } =
    useAppContext()

  // navigate hook
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values
    if (!email || !password) {
      displayAlert()
      return
    }
    const currentUser = { email, password }

    setupUser({
      currentUser,
      endPoint: 'login',
      textAlert: 'Wait...',
    })
  }

  // redirect if user haven't auth, yet
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/shops')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <div className="login">
      <div className="login__container">
        <header>
          <h1>Login</h1>
        </header>
        {showAlert && <Alert />}
        <form className="login__form" onSubmit={onSubmit}>
          <FormInput
            type="email"
            name={'email'}
            value={values.email}
            onChange={handleChange}
            label={'Email'}
          />
          <FormInput
            type="password"
            name={'password'}
            value={values.password}
            onChange={handleChange}
            label={'Password'}
          />

          <SubmitButton text="submit" />
          <p className="login__form-membership">
            Not a member yet?{' '}
            <Link className="auth-link" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
