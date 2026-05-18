import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './component/Login'
import Admin from './component/page/Admin'
import Doctor from './component/page/Doctor'
import Patient from './component/page/Patient'
import Receptionist from './component/page/Receptionist'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/receptionist' element={<Receptionist />} />
        <Route path='/patient' element={<Patient />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
