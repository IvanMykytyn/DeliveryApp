import './shopping-cart.styles.scss'
import React from 'react'

// components
import { CartList, UserInformation, Alert, Loading } from '../../components'

// context
import { useAppContext } from '../../context/appContext'

const ShoppingCart = () => {
  // global state
  const {
    user,
    orderUser,
    cart,
    amount,
    total,
    makeAnOrder,
    showAlert,
    displayAlert,
    isLoading,
    getOrderHistory,
  } = useAppContext()

  const onSubmit = (evt) => {
    evt.preventDefault()
    if (
      !(
        orderUser.name !== '' &&
        orderUser.email !== '' &&
        orderUser.phone !== '' &&
        orderUser.address !== ''
      )
    ) {
      displayAlert()
      return
    }

    makeAnOrder(user._id, orderUser, cart, amount, total)
    getOrderHistory()
  }

  return (
    <form className="shopping-cart-page" onSubmit={onSubmit}>
      {showAlert && <Alert />}
      {isLoading && <Loading />}
      <div className="shopping-sections">
        <UserInformation />
        <CartList />
      </div>
      <div className="shopping-totals">
        <h1 className="shopping-totals__total">TOTAL: {total} $</h1>
        <button
          type="submit"
          disabled={cart.length === 0 ? true : ''}
          className="shopping-totals__submit"
        >
          Submit order
        </button>
      </div>
    </form>
  )
}

export default ShoppingCart
