import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('clinic_user')
      if (savedUser) {
        return JSON.parse(savedUser)
      }
      // Fallback for legacy key
      const legacyLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      const legacyRole = localStorage.getItem('userRole')
      if (legacyLoggedIn && legacyRole) {
        return { name: `${legacyRole} User`, email: `${legacyRole.toLowerCase()}@clinic.com`, role: legacyRole }
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error)
    }
    return null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('clinic_user', JSON.stringify(user))
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userRole', user.role)
    } else {
      localStorage.removeItem('clinic_user')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userRole')
    }
  }, [user])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
