import React, { useState } from 'react'
import { DashboardHeader, DashboardLayout, Panel, StatCard } from './DashboardComponents'

const defaultQueue = [
  { name: 'Ali Khan', age: '32', phone: '0300-1234567', doctor: 'Dr. Ayesha', time: '10:30 AM' },
  { name: 'Sara Ahmed', age: '26', phone: '0311-9876543', doctor: 'Dr. Hamza', time: '12:00 PM' },
]

const emptyPatient = {
  name: '',
  age: '',
  phone: '',
  doctor: '',
  time: '',
}

function Receptionist() {
  const [queue, setQueue] = useState(defaultQueue)
  const [patient, setPatient] = useState(emptyPatient)

  const handleChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value })
  }

  const handleCreatePatient = (event) => {
    event.preventDefault()
    setQueue([patient, ...queue])
    setPatient(emptyPatient)
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        subtitle='Receptionist can add patients and assign doctors'
        title='Reception Dashboard'
      />

      <div className='mt-6 grid gap-4 md:grid-cols-3'>
        <StatCard title='Registered Patients' value={queue.length} />
        <StatCard title='Appointments' value={queue.length} />
        <StatCard title='Waiting' value={queue.length} />
      </div>

      <div className='mt-6 grid gap-6 lg:grid-cols-2'>
        <Panel title='Add Patient'>
          <form className='mt-4 space-y-3' onSubmit={handleCreatePatient}>
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='name' onChange={handleChange} placeholder='Patient name' required type='text' value={patient.name} />
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='age' onChange={handleChange} placeholder='Age' required type='number' value={patient.age} />
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='phone' onChange={handleChange} placeholder='Phone number' required type='text' value={patient.phone} />
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='doctor' onChange={handleChange} placeholder='Doctor name' required type='text' value={patient.doctor} />
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='time' onChange={handleChange} placeholder='Appointment time' required type='text' value={patient.time} />
            <button className='w-full rounded-md bg-teal-600 py-2 font-semibold text-white' type='submit'>
              Create Patient
            </button>
          </form>
        </Panel>

        <Panel title='Today Queue'>
          <div className='mt-4 space-y-3 text-sm'>
            {queue.map((item) => (
              <div className='rounded-md border border-gray-200 p-3' key={`${item.name}-${item.time}`}>
                <p className='font-semibold text-gray-800'>{item.name}</p>
                <p className='text-gray-500'>Age: {item.age} - Phone: {item.phone}</p>
                <p className='text-gray-500'>{item.time} - {item.doctor}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  )
}

export default Receptionist
