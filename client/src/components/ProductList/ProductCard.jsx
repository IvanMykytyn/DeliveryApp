import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../../context/appContext'

const ProductCard = ({ good }) => {
  const { addItem } = useAppContext()
  const [disabledItem, setDisabledItem] = useState(false)

  return (
    <section className="product-card" disabled={disabledItem}>
      <div className="product-card__img">
        <img src={good.photo} />
      </div>
      <div className="product-card__info">
        <div className="product-card__info__text">
          <h2 className="product-card__info__text-title">{good.name}</h2>
          <p className="product-card__info__text-price">{good.price + ' $'} </p>
        </div>
        <div className="product-card__info-submit">
          {/* <div className='product-card__alert'>
            <div className='product-card__alert-container'>
              <h2 className="product-card__info__text-title">{good.name}</h2>
              <p className="product-card__info__text-price">{good.price + ' $'} </p>
              
              <p className="product-card__info__text-count">{count}</p>
              
            </div>
          </div> */}
          <button
            type="button"
            onClick={() => {
              setDisabledItem(true)
              addItem(good)
            }}
            disabled={disabledItem}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductCard
