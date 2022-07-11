import React, { useState } from 'react'

// assets
import rejectIcon from './assets/reject.png'

// context
import { useAppContext } from '../../context/appContext'

const ProductCard = ({ good, defaultValue }) => {
  // global context
  const { addItem, removeItem } = useAppContext()
  const [disabledItem, setDisabledItem] = useState(defaultValue)

  return (
    <section className="product-card" disabled={disabledItem}>
      {disabledItem && (
        <img
          className="reject-icon"
          src={rejectIcon}
          alt="reject-icon"
          onClick={() => {
            setDisabledItem(false)
            removeItem(good._id)
          }}
        />
      )}
      <div className="product-card__img">
        <img src={good.photo} />
      </div>
      <div className="product-card__info">
        <div className="product-card__info__text">
          <h2 className="product-card__info__text-title">{good.name}</h2>
          <p className="product-card__info__text-price">{good.price + ' $'} </p>
        </div>
        <div className="product-card__info-submit">
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
