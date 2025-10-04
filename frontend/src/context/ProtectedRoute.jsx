import React from 'react'
import useAuth from './useAuth'
import LoginPage from '../Pages/LoginPage'
import HomePage from '../Pages/HomePage'

function ProtectedRoute() {
    const {user, loading} = useAuth()

    if(loading) return <div>Loaidng...</div>
    if(!user) {
      return <Navigate to="/auth/login" replace />
    }
  return user ? <HomePage /> : <LoginPage />
}

export default ProtectedRoute