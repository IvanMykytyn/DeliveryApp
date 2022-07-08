import React from 'react'

const ProductCard = ({ title, price }) => {
  return (
    <div className="product-card">
      <div className="product-card__img"></div>

      <div className="product-card__info">
        <div className="product-card__info__text">
          <h2 className="product-card__info__text-title">{title}</h2>
          <p className="product-card__info__text-price">{price}</p>
        </div>
        <div className='product-card__info-submit'>
            <button type="button">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
