import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, user } = useAuth()

  if (!isLoggedIn || !user) {
    return <Navigate to='/' replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleRoutes = {
      Admin: '/admin',
      Doctor: '/doctor',
      Receptionist: '/receptionist',
      Patient: '/patient',
    }
    return <Navigate to={roleRoutes[user.role] || '/'} replace />
  }

  return children
}
