import './shop-list.styles.scss'
import React, { useState,useEffect } from 'react'

// components
import ShopItem from './ShopItem'

// context
import { useAppContext } from '../../context/appContext'

const ShopList = () => {
  // global state
  const { shops, getShops, setCurrentShop, currentShop, cart, displayAlert } = useAppContext()
  const [isFetching, setIsFetching] = useState(true)

  // get shops
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
