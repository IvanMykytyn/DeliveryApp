import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import './product-list.styles.scss'

import ProductCard from './ProductCard'

const ProductList = () => {
  const { cart, goods, currentShop, getGoods, getTotals,setCart, setCurrentShop } =
    useAppContext()
  

  useEffect(() => {
    let prev_shop = localStorage.getItem('shop') || ''
    setCurrentShop(prev_shop)

    let prev_items = JSON.parse(localStorage.getItem('cart')) || []
    setCart(prev_items)

  }, [])

  useEffect(() => {
    if (
      cart?.length === 0 &&
      JSON.parse(localStorage.getItem('cart')?.length !== 0)
    ) {
      return
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    getTotals()

  }, [cart])

  useEffect(() => {
    if (currentShop) {
      getGoods(currentShop)
    }
  }, [currentShop])

  if (currentShop === '') {
    return <h1>Please select a store for food delivery</h1>
  }
  if (goods.length === 0) {
    return <h1>This store does not currently have a menu</h1>
  }

  return (
    <article className="product-cards">
      {goods &&
        goods.map((good) => {
          let defaultValue = false
          if (cart.length !== 0 && cart.some((item) => item._id === good._id)) {
            defaultValue = true
          }
          return (
            <ProductCard
              key={good._id}
              good={good}
              defaultValue={defaultValue}
            />
          )
        })}
    </article>
  )
}

export default ProductList
