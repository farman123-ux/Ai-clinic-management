import React, { useState } from 'react'
import { DashboardHeader, DashboardLayout, Panel, StatCard } from './DashboardComponents'

const defaultUsers = [
  { name: 'Dr. Ayesha', role: 'Doctor', email: 'doctor@clinic.com', status: 'Active' },
  { name: 'Nida Frontdesk', role: 'Receptionist', email: 'receptionist@clinic.com', status: 'Active' },
  { name: 'Ali Khan', role: 'Patient', email: 'patient@clinic.com', status: 'Pending' },
]

const emptyUser = {
  name: '',
  role: 'Doctor',
  email: '',
}

function Admin() {
  const [users, setUsers] = useState(defaultUsers)
  const [selectedUser, setSelectedUser] = useState(defaultUsers[0])
  const [newUser, setNewUser] = useState(emptyUser)

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  const handleAddUser = (event) => {
    event.preventDefault()

    const user = { ...newUser, status: 'Active' }
    setUsers([user, ...users])
    setSelectedUser(user)
    setNewUser(emptyUser)
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        subtitle='Admin can add doctors, receptionists, and patients'
        title='Admin Dashboard'
      />

      <div className='mt-6 grid gap-4 md:grid-cols-4'>
        <StatCard title='Doctors' value={users.filter((user) => user.role === 'Doctor').length} />
        <StatCard title='Patients' value={users.filter((user) => user.role === 'Patient').length} />
        <StatCard title='Reception' value={users.filter((user) => user.role === 'Receptionist').length} />
        <StatCard title='All Users' value={users.length} />
      </div>

      <div className='mt-6 grid gap-6 lg:grid-cols-2'>
        <Panel title='Add User'>
          <form className='mt-4 space-y-3' onSubmit={handleAddUser}>
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='name' onChange={handleChange} placeholder='Full name' required type='text' value={newUser.name} />
            <select className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='role' onChange={handleChange} value={newUser.role}>
              <option>Doctor</option>
              <option>Receptionist</option>
              <option>Patient</option>
            </select>
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='email' onChange={handleChange} placeholder='Email address' required type='email' value={newUser.email} />
            <button className='w-full rounded-md bg-teal-600 py-2 font-semibold text-white' type='submit'>
              Add {newUser.role}
            </button>
          </form>
        </Panel>

        <Panel title='Users'>
          <div className='mt-4 space-y-3'>
            {users.map((user) => (
              <button
                className={`w-full rounded-md border p-3 text-left text-sm ${selectedUser.email === user.email ? 'border-teal-600 bg-teal-50' : 'border-gray-200 bg-white hover:border-teal-300'}`}
                key={user.email}
                onClick={() => setSelectedUser(user)}
                type='button'
              >
                <p className='font-semibold text-gray-800'>{user.name}</p>
                <p className='text-gray-500'>{user.role} - {user.email}</p>
              </button>
            ))}
          </div>

          <div className='mt-5 rounded-md bg-gray-50 p-4 text-sm'>
            <p><span className='font-semibold'>Name:</span> {selectedUser.name}</p>
            <p><span className='font-semibold'>Role:</span> {selectedUser.role}</p>
            <p><span className='font-semibold'>Email:</span> {selectedUser.email}</p>
            <p><span className='font-semibold'>Status:</span> {selectedUser.status}</p>
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  )
}

export default Admin
 