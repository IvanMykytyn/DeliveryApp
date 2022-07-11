import './landing.styles.scss'
import React, {useEffect} from 'react'

// React Router dom
import { Link, useNavigate } from 'react-router-dom'

// context
import { useAppContext } from '../../context/appContext'

const Landing = () => {
  // global state
  const { user } = useAppContext()

  // navigate hook
  const navigate = useNavigate()

  // redirect if user have already exists
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/shops')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <div className="landing">
      <div className="landing__info">
        <div className="landing__info-container">
          <h1 className="landing__info-title">Delivery App</h1>
          <p className="landing__info-paragraph">
            In consequat sodales viverra. Morbi vitae dolor ipsum. Etiam nec sem
            a mauris dignissim iaculis sit amet a felis. Curabitur luctus mauris
            est. Pellentesque vulputate id elit vel maximus. Maecenas laoreet
            gravida magna, ac dignissim erat feugiat et.
          </p>
          <button className="landing__info-button">
            <Link className="landing__info-button-link" to="/login">
              Login/Register
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
