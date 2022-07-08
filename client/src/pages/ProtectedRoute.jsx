import { useAppContext } from '../context/appContext'
import { Navigate, Outlet } from 'react-router-dom'

import { Navbar } from '../components'

const ProtectedRoute = () => {
  const { user } = useAppContext()
  if (!user) {
    return <Navigate to="/landing" />
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default ProtectedRoute
