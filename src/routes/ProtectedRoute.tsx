import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { authStatusContext } from './AuthStatus/AuthStatusProvider'

export interface IProtectedRoute {
  level: number
}

const ProtectedRoute = (props: IProtectedRoute) => {
  const authStatus = useContext(authStatusContext)
  if (authStatus.isAuthenticated === false) {
    return <Navigate to="/login" />
  }
  if (authStatus.level >= props.level) {
    return <Outlet />
  }
  return <Navigate to="/permissionDenied" />
}

export default ProtectedRoute
