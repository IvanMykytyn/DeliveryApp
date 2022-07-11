import './cart-list.styles.scss'
import React, { useEffect } from 'react'

// components
import CartItem from './CartItem'

// context
import { useAppContext } from '../../context/appContext'

const CartList = () => {
  // global state
  const { cart, toggleAmount, removeItem, clearCart, getTotals, setCart } =
    useAppContext()

  // get cart from Local Storage
  useEffect(() => {
    let prev_items = JSON.parse(localStorage.getItem('cart')) || []
    setCart(prev_items)
  }, [])

  // set cart to Local Storage
  useEffect(() => {
    if (
      cart.length === 0 &&
      JSON.parse(localStorage.getItem('cart')?.length !== 0)
    ) {
      return
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    getTotals()
  }, [cart])

  // if cart is empty
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
      <div className="cart-list__div">
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
        <button type="button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  )
}

export default CartList
