import React from 'react'
import './navbar.styles.scss'

import { Link } from 'react-router-dom'

// app context
import { useAppContext } from '../../context/appContext'

const Navbar = () => {
  const { user, logoutUser } = useAppContext()

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
      </div>

      <div className="navbar__logout">
        <h4 className='navbar__logout-name'>{user.name}</h4>
        <button type="button" className="navbar__logout-button" onClick={logoutUser}>LOG OUT</button>
      </div>
    </nav>
  )
}

export default Navbar
