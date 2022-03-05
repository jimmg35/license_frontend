import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { authStatusContext } from './AuthStatus/AuthStatusProvider'

const ProtectedRoute = () => {
  const authStatus = useContext(authStatusContext)
  authStatus.authenticateToken(localStorage.getItem('token') as string)
  // alert(authStatus.isAuthenticated)
  // alert(authStatus.isAuthenticated + ' route')
  return authStatus.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
