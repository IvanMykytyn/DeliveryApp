import './user-information.styles.scss'

import './user-information.styles.scss'
import React from 'react'

// components
import FormInput from '../FormInput/FormInput'

//context
import { useAppContext } from '../../context/appContext'

const UserInformation = () => {
  // global state
  const { orderUser, setOrderUser } = useAppContext()

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
      />
      <FormInput
        type="email"
        name={'email'}
        value={orderUser.email}
        onChange={handleChange}
        label={'example@gmail.com'}
        labelText={'Email:'}
      />
      <FormInput
        type="text"
        name={'phone'}
        value={orderUser.phone}
        onChange={handleChange}
        label={'0677451469'}
        labelText={'Phone:'}
      />
      <FormInput
        type="text"
        name={'address'}
        value={orderUser.address}
        onChange={handleChange}
        label={'Lviv, street 3'}
        labelText={'Address:'}
      />
    </section>
  )
}

export default UserInformation
