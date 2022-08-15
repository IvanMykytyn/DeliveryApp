import './register.styles.scss'
import React, { useState, useEffect } from 'react'

import { useFormik } from 'formik'

import { SignupSchema } from './schema'

// components
import { FormInput, SubmitButton, Alert } from '../../components'

// React Router dom
import { Link, useNavigate } from 'react-router-dom'

// app context
import { useAppContext } from '../../context/appContext'

const initialValues = {
  name: '',
  email: '',
  password: '',
}

const Register = () => {
  // global state
  const { user, setupUser, showAlert } = useAppContext()

  // navigate hook
  const navigate = useNavigate()

  // onSubmit
  const onSubmit = (values) => {
    const { name, email, password } = values
    const currentUser = { name, email, password }

    setupUser({
      currentUser,
      endPoint: 'register',
      textAlert: 'Wait...',
    })
  }

  // formik setup
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit,
    })

  // redirect if user haven't auth, yet
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/shops')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <div className="register">
      <div className="register__container">
        <header>
          <h1>Register</h1>
        </header>
        {showAlert && <Alert />}
        <form className="register__form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name={'name'}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label={'First name'}
            error={errors.name}
            touched={touched.name}
          />
          <FormInput
            type="email"
            name={'email'}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label={'Email'}
            error={errors.email}
            touched={touched.email}
          />
          <FormInput
            type="password"
            name={'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label={'Password'}
            error={errors.password}
            touched={touched.password}
          />

          <SubmitButton text="submit" />
          <p className="register__form-membership">
            Already a member?{' '}
            <Link className="auth-link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Register
