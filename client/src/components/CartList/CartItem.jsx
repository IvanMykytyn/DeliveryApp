import React from 'react'

const CartItem = ({ item, toggle, remove }) => {
  return (
    <div className="cart-item">
      <img src={item.photo} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <h4 className="item-price">${item.price}</h4>
        <button className="remove-btn" onClick={() => remove(item._id)}>
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          className="amount-btn"
          onClick={() => toggle(item._id, 'inc')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          </svg>
        </button>
        <p className="amount">{item.amount}</p>
        <button
          type="button"
          className="amount-btn"
          onClick={() =>
            item.amount <= 1 ? remove(item._id) : toggle(item._id, 'dec')
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CartItem
