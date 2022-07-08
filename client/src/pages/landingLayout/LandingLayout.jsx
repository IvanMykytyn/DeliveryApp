import './landing-layout.styles.scss'
import { Outlet } from 'react-router-dom'

import React from 'react'

// assets
import LandingImg from './assets/landing.svg'

const LandingLayout = () => {
  return (
    <div className='landing-layout'>
        <div className="landing-layout__img">
        <img src={LandingImg} alt="landing-img" />
      </div>
        <Outlet />
    </div>
  )
}

export default LandingLayout