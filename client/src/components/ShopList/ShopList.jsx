import './shop-list.styles.scss'

import React from 'react'
import ShopItem from './ShopItem'

import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import { useState } from 'react'

const ShopList = () => {
  const { shops, getShops, setCurrentShop, currentShop, cart, displayAlert } = useAppContext()
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (isFetching) {
      if (shops.length === 0) {
        setIsFetching(false)
        getShops()
      }
    }
  }, [])

  return (
    <div className="shop__list">
      {shops &&
        shops.map((shop) => {
          return (
            <ShopItem
              key={shop._id}
              shop={shop}
              setCurrentShop={setCurrentShop}
              currentShop={currentShop}
              cart={cart}
              displayAlert={displayAlert}
            />
          )
        })}
    </div>
  )
}

export default ShopList
