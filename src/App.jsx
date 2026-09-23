import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './component/Login'
import ProtectedRoute from './component/ProtectedRoute'
import Admin from './component/page/Admin'
import Doctor from './component/page/Doctor'
import Patient from './component/page/Patient'
import Receptionist from './component/page/Receptionist'
import { AuthProvider } from './context/AuthContext'
import { ClinicProvider } from './context/ClinicContext'

function App() {
  return (
    <AuthProvider>
      <ClinicProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/admin'
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path='/doctor'
              element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                  <Doctor />
                </ProtectedRoute>
              }
            />
            <Route
              path='/receptionist'
              element={
                <ProtectedRoute allowedRoles={['Receptionist']}>
                  <Receptionist />
                </ProtectedRoute>
              }
            />
            <Route
              path='/patient'
              element={
                <ProtectedRoute allowedRoles={['Patient']}>
                  <Patient />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ClinicProvider>
    </AuthProvider>
  )
}

export default App
