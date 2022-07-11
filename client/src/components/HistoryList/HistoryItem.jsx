import React from 'react'

// components
import CartHistoryItem from './CartHistoryItem'

const HistoryItem = ({ order }) => {
  return (
    <div className="history-item">
      <div className="history-item__goods">
        {order.cart && order.cart !== 0 && order.cart.map((cartItem,index) => {
          return <CartHistoryItem key={index} amount={cartItem.amount} good={cartItem.good}/>
        })}
      </div>
      <div className="history-item__totals">
        <div>
          <h4>Total Amount: {order.amount}</h4>
          <h2>Total Price: {order.total} $</h2>
        </div>
      </div>
    </div>
  )
}

export default HistoryItem
