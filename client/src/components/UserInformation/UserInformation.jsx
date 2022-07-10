import './user-information.styles.scss'

import React from 'react'
import FormInput from '../FormInput/FormInput'

import { useState } from 'react'
import { useAppContext } from '../../context/appContext'

const UserInformation = () => {
  const { user, orderUser, setOrderUser } = useAppContext()

  
  const handleChange = (e) => {
    setOrderUser(e)
  }

  return (
    <section className="user-information">
      <FormInput
        type="text"
        name={'name'}
        value={orderUser.name}
        onChange={handleChange}
        label={'John'}
        labelText={'Name:'}
        // error={}
      />
      <FormInput
        type="email"
        name={'email'}
        value={orderUser.email}
        onChange={handleChange}
        label={'example@gmail.com'}
        labelText={'Email:'}
        // error={}
      />
      <FormInput
        type="text"
        name={'phone'}
        value={orderUser.phone}
        onChange={handleChange}
        label={'0677451469'}
        labelText={'Phone:'}
        // error={}
      />
      <FormInput
        type="text"
        name={'address'}
        value={orderUser.address}
        onChange={handleChange}
        label={'Lviv, street 3'}
        labelText={'Address:'}
        // error={}
      />
    </section>
  )
}

export default UserInformation
