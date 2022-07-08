

import React from 'react'

const ShopItem = ({name}) => {
  return (
    <button className='shop__list-item'>
        <h3 className='shop__list-item-header'>{name}</h3>
    </button>
  )
}

export default ShopItem