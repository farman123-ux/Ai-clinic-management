import { useState } from 'react'
import { useClinic } from '../../context/ClinicContext'
import { DashboardHeader, DashboardLayout, Panel, StatCard } from './DashboardComponents'

const emptyUser = {
  name: '',
  role: 'Doctor',
  email: '',
}

function Admin() {
  const { users, addUser } = useClinic()
  const [selectedUser, setSelectedUser] = useState(() => users[0] || null)
  const [newUser, setNewUser] = useState(emptyUser)

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  const handleAddUser = (event) => {
    event.preventDefault()

    const user = { ...newUser, status: 'Active' }
    addUser(user)
    setSelectedUser(user)
    setNewUser(emptyUser)
  }

  const activeSelected = selectedUser || users[0] || null

  return (
    <DashboardLayout>
      <DashboardHeader
        subtitle='Admin can add doctors, receptionists, and patients'
        title='Admin Dashboard'
      />

      <div className='grid gap-4 md:grid-cols-4'>
        <StatCard title='Doctors' value={users.filter((user) => user.role === 'Doctor').length} />
        <StatCard title='Patients' value={users.filter((user) => user.role === 'Patient').length} />
        <StatCard title='Reception' value={users.filter((user) => user.role === 'Receptionist').length} />
        <StatCard title='All Users' value={users.length} />
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Panel title='Add User'>
          <form className='mt-4 space-y-3' onSubmit={handleAddUser}>
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='name'
              onChange={handleChange}
              placeholder='Full name'
              required
              type='text'
              value={newUser.name}
            />
            <select
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition bg-white'
              name='role'
              onChange={handleChange}
              value={newUser.role}
            >
              <option value='Doctor'>Doctor</option>
              <option value='Receptionist'>Receptionist</option>
              <option value='Patient'>Patient</option>
            </select>
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='email'
              onChange={handleChange}
              placeholder='Email address'
              required
              type='email'
              value={newUser.email}
            />
            <button
              className='w-full rounded-md bg-teal-600 hover:bg-teal-700 py-2 font-semibold text-white transition cursor-pointer'
              type='submit'
            >
              Add {newUser.role}
            </button>
          </form>
        </Panel>

        <Panel title='Users List'>
          <div className='mt-4 max-h-60 overflow-y-auto space-y-2.5 pr-1'>
            {users.map((user, idx) => (
              <button
                className={`w-full rounded-md border p-3 text-left text-sm transition cursor-pointer ${
                  activeSelected?.email === user.email
                    ? 'border-teal-600 bg-teal-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-teal-300'
                }`}
                key={`${user.email}-${idx}`}
                onClick={() => setSelectedUser(user)}
                type='button'
              >
                <p className='font-semibold text-gray-800'>{user.name}</p>
                <p className='text-xs text-gray-500 mt-0.5'>{user.role} &bull; {user.email}</p>
              </button>
            ))}
          </div>

          {activeSelected && (
            <div className='mt-5 rounded-md bg-gray-50 p-4 text-sm border border-gray-200'>
              <p><span className='font-semibold text-gray-700'>Name:</span> {activeSelected.name}</p>
              <p><span className='font-semibold text-gray-700'>Role:</span> {activeSelected.role}</p>
              <p><span className='font-semibold text-gray-700'>Email:</span> {activeSelected.email}</p>
              <p><span className='font-semibold text-gray-700'>Status:</span> {activeSelected.status || 'Active'}</p>
            </div>
          )}
        </Panel>
      </div>
    </DashboardLayout>
  )
}

export default Admin