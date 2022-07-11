import React from 'react'

const CartHistoryItem = ({ good, amount }) => {
  return (
    <div className="cart-history-item">
      <img src={good.photo} alt={good.name} />
      <div className="cart-history-item__prices">
        <h2>{good.name}</h2>
        <h4 className="cart-history-item__prices__text">
          Price per Item: <span>{good.price}</span> $
        </h4>
        <h4 className="cart-history-item__prices__text">
          Amount: <span>{amount}</span>
        </h4>
        <h4 className="cart-history-item__prices__total">
          Total: <span>{parseFloat((good.price * amount).toFixed(2))}</span> $
        </h4>
      </div>
      <div></div>
    </div>
  )
}

export default CartHistoryItem
