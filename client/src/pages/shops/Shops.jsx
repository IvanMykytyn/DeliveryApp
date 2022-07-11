import './shops.styles.scss'
import React from 'react'

// components
import { ShopList, ProductList, Alert } from '../../components'

// context
import { useAppContext } from '../../context/appContext'

const Shops = () => {
  // global state
  const { showAlert } = useAppContext()

  return (
    <>
      {showAlert && <Alert />}
      <div className="shops">
        <div className="shops__list">
          <header className="shops__list-header">
            <h2>Shops</h2>
          </header>
          <ShopList />
        </div>
        <div className="shops__products">
          <ProductList />
        </div>
      </div>
    </>
  )
}

export default Shops
