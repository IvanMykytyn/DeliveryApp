import './register.styles.scss'

import React from 'react'
import { useState, useEffect } from 'react'

// components
import { FormInput, SubmitButton } from '../../components'

// router-dom
import { Link, useNavigate } from 'react-router-dom'

// app context
import { useAppContext } from '../../context/appContext'

const initialState = {
  name: '',
  email: '',
  password: '',
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, setupUser } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password } = values
    if (!email || !password || !name) {
      return
    }
    const currentUser = { name, email, password }

    setupUser({
      currentUser,
      endPoint: 'register',
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
    <div className="register">
      <div className="register__container">
        <header>
          <h1>Register</h1>
        </header>
        <form className="register__form" onSubmit={onSubmit}>
          <FormInput
            type="text"
            name={'name'}
            value={values.name}
            onChange={handleChange}
            label={'First name'}
            // error={}
          />
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
          <p className="register__form-membership">
            Already a member? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Register
