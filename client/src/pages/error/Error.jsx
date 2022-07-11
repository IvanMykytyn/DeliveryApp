import './error.styles.scss'

import React from 'react'

// assets
import Error404 from './assets/404Error.svg'

// React Router dom
import { Link } from 'react-router-dom'

// context
import { useAppContext } from '../../context/appContext'

const Error = () => {
  // global state
  const { user } = useAppContext()

  return (
    <div className="error-page">
      <img src={Error404} alt="error-img" />
      <h2>Something goes wrong.Try again Later...</h2>
      {user ? (
        <Link className="error-page__link" to="/shops">
          Go Back
        </Link>
      ) : (
        <Link className="error-page__link" to="/">
          Go Back
        </Link>
      )}
    </div>
  )
}

export default Error
