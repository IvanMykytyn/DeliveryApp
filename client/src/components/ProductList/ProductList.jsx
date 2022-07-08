import React from 'react'
import './product-list.styles.scss'

import ProductCard from './ProductCard'

const products = [
    {
        title: 'Big Burger',
        price: 30.12,
    },
    {
        title: 'Big LARGE Burger',
        price: 10.2,
    },
    {
        title: 'SMALL Burger',
        price: 20.32,
    }
]

const ProductList = () => {
  return (
    <div className='product-cards'>
      {products.map((product, index)=>{
            return(<ProductCard key={index} {...product}/>)
        })}
    </div>
  )
}

export default ProductList
