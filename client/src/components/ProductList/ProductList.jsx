import React, { useEffect } from 'react'
import './product-list.styles.scss'

// components
import ProductCard from './ProductCard'
import { Loading } from '../../components/'

// context
import { useAppContext } from '../../context/appContext'

const ProductList = () => {
  // global state
  const {
    isLoading,
    cart,
    goods,
    currentShop,
    getGoods,
    getTotals,
    setCart,
    setCurrentShop,
  } = useAppContext()

  // get current shop and cart from Local Storage
  useEffect(() => {
    let prev_shop = localStorage.getItem('shop') || ''
    setCurrentShop(prev_shop)

    let prev_items = JSON.parse(localStorage.getItem('cart')) || []
    setCart(prev_items)
  }, [])

  // set current cart to Local Storage
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

  // set current shop to Local Storage
  useEffect(() => {
    if (currentShop) {
      getGoods(currentShop)
    }
  }, [currentShop])

  if (isLoading) {
    return <Loading />
  }

  if (currentShop === '') {
    return <h1>Please select a store for food delivery</h1>
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
