import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function DashboardLayout({ children }) {
  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-6'>
      <div className='mx-auto max-w-6xl space-y-6'>{children}</div>
    </div>
  )
}

export function DashboardHeader({ title, subtitle, onLogout }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      logout()
    }
    navigate('/')
  }

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-white p-5 shadow-sm border border-gray-100'>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>{title}</h1>
        <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>
      </div>
      <div className='flex items-center gap-3 self-end sm:self-auto'>
        {user && (
          <div className='text-right hidden sm:block'>
            <p className='text-xs font-semibold text-gray-800'>{user.name}</p>
            <span className='inline-block text-[10px] bg-teal-100 text-teal-800 font-medium px-2 py-0.5 rounded-full'>
              {user.role}
            </span>
          </div>
        )}
        <button
          className='rounded-md bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition cursor-pointer'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export function StatCard({ title, value }) {
  return (
    <div className='rounded-lg bg-white p-5 shadow-sm border border-gray-100'>
      <p className='text-xs font-medium uppercase tracking-wider text-gray-500'>{title}</p>
      <h2 className='text-2xl font-bold text-gray-800 mt-1'>{value}</h2>
    </div>
  )
}

export function Panel({ children, title }) {
  return (
    <div className='rounded-lg bg-white p-5 shadow-sm border border-gray-100'>
      <h2 className='text-xl font-bold text-gray-800 border-b border-gray-100 pb-3'>{title}</h2>
      <div className='pt-2'>{children}</div>
    </div>
  )
}
