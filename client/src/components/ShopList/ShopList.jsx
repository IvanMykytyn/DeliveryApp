import './shop-list.styles.scss'

import React from 'react'
import ShopItem from './ShopItem'

const shops = [
    {
        name: 'McDonald\'s'
    },
    {
        name: 'Teddy Restaurant'
    },
    {
        name: 'Celentano Ristorante'
    },
    {
        name: 'Varka Beer'
    },
    {
        name: 'Kraft Burger'
    },
]

const ShopList = () => {
  return (
    <div className='shop__list'>
        {shops.map((shop, index)=>{
            return(<ShopItem key={index} {...shop}/>)
        })}
    </div>
  )
}

export default ShopList