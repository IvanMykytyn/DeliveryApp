import React from 'react'

const ShopItem = ({ shop, setCurrentShop, currentShop, cart, displayAlert }) => {
  return (
    <button
      className={
        'shop__list-item' +
        (currentShop === shop._id ? ' shop__list-item-active' : '')
      }

      onClick={() => { 
        if(cart.length === 0){
          setCurrentShop(shop._id)
          localStorage.setItem('shop', shop._id);
        }else{
          displayAlert('You cannot choose goods from other stores while your cart is not empty')
        }
      }}
    >
      <h3 className="shop__list-item-header">{shop.name}</h3>
    </button>
  )
}

export default ShopItem
