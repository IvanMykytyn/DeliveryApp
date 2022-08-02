import './user-information.styles.scss'
import React from 'react'

// components
import FormInput from '../FormInput/FormInput'

const UserInformation = ({ formik }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik

  return (
    <section className="user-information">
      <FormInput
        type="text"
        name={'name'}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        label={'John'}
        labelText={'Name:'}
      />
      <FormInput
        type="email"
        name={'email'}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        label={'example@gmail.com'}
        labelText={'Email:'}
      />
      <FormInput
        type="text"
        name={'phone'}
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone}
        touched={touched.phone}
        label={'0677451469'}
        labelText={'Phone:'}
      />
      <FormInput
        type="text"
        name={'address'}
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.address}
        touched={touched.address}
        label={'Lviv, street 3'}
        labelText={'Address:'}
      />
    </section>
  )
}

export default UserInformation
