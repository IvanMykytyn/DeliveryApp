// React Router dom
import { Navigate, Outlet } from 'react-router-dom'

// components
import { Navbar } from '../components'

// context
import { useAppContext } from '../context/appContext'

const ProtectedRoute = () => {
  // global state
  const { user, token } = useAppContext()

  if (!user || !token) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default ProtectedRoute
