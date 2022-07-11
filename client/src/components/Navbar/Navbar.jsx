import React, { useEffect } from 'react'
import './navbar.styles.scss'

// react router dom
import { Link } from 'react-router-dom'

// app context
import { useAppContext } from '../../context/appContext'

const Navbar = () => {
  // global state
  const { cart, user, logoutUser, amount, getTotals, } = useAppContext()

  useEffect(() => {
    getTotals()
  }, [cart])

  return (
    <nav className="navbar">
      <div className="navbar__links">
        <Link to="/shops" className="navbar__links-link">
          SHOPS
        </Link>
        <div className="navbar__links-divide-line"></div>
        <Link to="/cart" className="navbar__links-link">
          SHOPPING CART
        </Link>
        <div className="navbar__links-divide-line"></div>
        <Link to="/history" className="navbar__links-link">
          HISTORY
        </Link>
      </div>

      <div className="navbar__logout">
        <h4 className='navbar__logout-name'>{user.name}</h4>
        <Link to="/cart" className="nav-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z" />
          </svg>
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </Link>
        <button type="button" className="navbar__logout-button" onClick={logoutUser}>LOG OUT</button>
      </div>
    </nav>
  )
}

export default Navbar
