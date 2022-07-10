import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import './product-list.styles.scss'

import ProductCard from './ProductCard'

const ProductList = () => {
  const { goods, currentShop, getGoods } = useAppContext()
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (currentShop && isFetching) {
      if (goods.length === 0) {
        setIsFetching(false)
        getGoods(currentShop)
      }
    }
  }, [])

  useEffect(() => {
    getGoods(currentShop)
  }, [currentShop])

  if (currentShop === '') {
    return <h1>Please select a store for food delivery</h1>
  }
  if (goods.length === 0){
    return <h1>This store does not currently have a menu</h1>
  }

  return (
    <article className="product-cards">
      {goods &&
        goods.map((good) => {
          return <ProductCard key={good._id} good={good} />
        })}
    </article>
  )
}

export default ProductList
