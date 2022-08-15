import './shopping-cart.styles.scss'
import React from 'react'
import { useFormik } from 'formik'

// components
import { CartList, UserInformation, Alert, Loading } from '../../components'

// context
import { useAppContext } from '../../context/appContext'

// schema
import { orderSchema } from './schema'

const ShoppingCart = () => {
  // global state
  const {
    user,
    cart,
    amount,
    total,
    makeAnOrder,
    showAlert,
    isLoading,
    getOrderHistory,
  } = useAppContext()

  // initial values
  const initialValues = {
    name: user.name,
    email: user.email,
    phone: '',
    address: '',
  }

  const onSubmit = (values, actions) => {
    makeAnOrder(user._id, values, cart, amount, total)
    getOrderHistory()

    actions.resetForm()
  }

  const formik = useFormik({
    initialValues,
    validationSchema: orderSchema,
    onSubmit,
  })

  return (
    <form className="shopping-cart-page" onSubmit={formik.handleSubmit}>
      {showAlert && <Alert />}
      {isLoading && <Loading />}
      <div className="shopping-sections">
        <UserInformation formik={formik} />
        <CartList />
      </div>
      <div className="shopping-totals">
        <h1 className="shopping-totals__total">TOTAL: {total} $</h1>
        <button
          type="submit"
          disabled={
            Object.keys(formik.errors).length !== 0 || cart.length === 0
              ? true
              : ''
          }
          className="shopping-totals__submit"
        >
          Submit order
        </button>
      </div>
    </form>
  )
}

export default ShoppingCart
