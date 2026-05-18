import React from 'react'
import { useNavigate } from 'react-router-dom'

export function DashboardLayout({ children }) {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='mx-auto max-w-6xl'>{children}</div>
    </div>
  )
}

export function DashboardHeader({ title, subtitle, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
      return
    }

    navigate('/')
  }

  return (
    <div className='flex items-center justify-between rounded-lg bg-white p-5 shadow'>
      <div>
        <h1 className='text-3xl font-bold text-gray-800'>{title}</h1>
        <p className='text-sm text-gray-500'>{subtitle}</p>
      </div>
      <button className='rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export function StatCard({ title, value }) {
  return (
    <div className='rounded-lg bg-white p-5 shadow'>
      <p className='text-sm text-gray-500'>{title}</p>
      <h2 className='text-2xl font-bold text-gray-800'>{value}</h2>
    </div>
  )
}

export function Panel({ children, title }) {
  return (
    <div className='rounded-lg bg-white p-5 shadow'>
      <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
      {children}
    </div>
  )
}
