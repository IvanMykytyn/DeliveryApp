import './cart-list.styles.scss'
import React from 'react'

import CartItem from './CartItem'
import { useAppContext } from '../../context/appContext'

const CartList = () => {
  const { cart, toggleAmount, removeItem, clearCart } = useAppContext()

  if (cart.length === 0) {
    return (
      <section className="cart-list">
        <header className="empty-cart">
          <h2>Your cart is currently empty</h2>
        </header>
      </section>
    )
  }

  return (
    <div className="cart-list">
      <div className='cart-list__div'>
        {cart &&
          cart.map((item, index) => {
            return (
              <CartItem
                key={index}
                item={item}
                toggle={toggleAmount}
                remove={removeItem}
              />
            )
          })}
      </div>
      <div className="cart-list__clear-cart">
        <button type="button" onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  )
}

export default CartList
