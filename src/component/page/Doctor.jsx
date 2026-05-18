import React, { useState } from 'react'
import { DashboardHeader, DashboardLayout, Panel, StatCard } from './DashboardComponents'

const defaultPatients = [
  {
    name: 'Ali Khan',
    age: '32',
    diagnosis: 'Flu and fever',
    appointment: '10:30 AM',
    prescription: 'Paracetamol, rest, fluids',
    status: 'Waiting',
  },
  {
    name: 'Sara Ahmed',
    age: '26',
    diagnosis: 'Migraine',
    appointment: '12:00 PM',
    prescription: 'Pain relief medicine',
    status: 'Checked',
  },
]

const emptyPatient = {
  name: '',
  age: '',
  diagnosis: '',
  appointment: '',
  prescription: '',
  status: 'Pending',
}

function Doctor() {
  const [patients, setPatients] = useState(defaultPatients)
  const [selectedPatient, setSelectedPatient] = useState(defaultPatients[0])
  const [newPatient, setNewPatient] = useState(emptyPatient)

  const handleChange = (event) => {
    setNewPatient({ ...newPatient, [event.target.name]: event.target.value })
  }

  const handleAddPatient = (event) => {
    event.preventDefault()
    setPatients([newPatient, ...patients])
    setSelectedPatient(newPatient)
    setNewPatient(emptyPatient)
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        subtitle='Doctor can add patients and view diagnosis details'
        title='Doctor Dashboard'
      />

      <div className='mt-6 grid gap-4 md:grid-cols-3'>
        <StatCard title='Patients' value={patients.length} />
        <StatCard title='Appointments' value={patients.filter((patient) => patient.appointment).length} />
        <StatCard title='Pending' value={patients.filter((patient) => patient.status === 'Pending').length} />
      </div>

      <div className='mt-6 grid gap-6 lg:grid-cols-2'>
        <Panel title='Add Patient'>
          <form className='mt-4 space-y-3' onSubmit={handleAddPatient}>
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='name' onChange={handleChange} placeholder='Patient name' required type='text' value={newPatient.name} />
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='age' onChange={handleChange} placeholder='Age' required type='number' value={newPatient.age} />
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='diagnosis' onChange={handleChange} placeholder='Diagnosis' required type='text' value={newPatient.diagnosis} />
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='appointment' onChange={handleChange} placeholder='Appointment time' required type='text' value={newPatient.appointment} />
            <textarea className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' name='prescription' onChange={handleChange} placeholder='Prescription' required rows='3' value={newPatient.prescription}></textarea>
            <button className='w-full rounded-md bg-teal-600 py-2 font-semibold text-white' type='submit'>
              Add Patient
            </button>
          </form>
        </Panel>

        <Panel title='Patient List'>
          <div className='mt-4 space-y-3'>
            {patients.map((patient) => (
              <button
                className={`w-full rounded-md border p-3 text-left text-sm ${selectedPatient.name === patient.name ? 'border-teal-600 bg-teal-50' : 'border-gray-200 bg-white hover:border-teal-300'}`}
                key={`${patient.name}-${patient.appointment}`}
                onClick={() => setSelectedPatient(patient)}
                type='button'
              >
                <p className='font-semibold text-gray-800'>{patient.name}</p>
                <p className='text-gray-500'>{patient.diagnosis}</p>
              </button>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title='Patient Details'>
        <div className='mt-4 grid gap-4 sm:grid-cols-3'>
          <p className='text-sm'><span className='font-semibold'>Name:</span> {selectedPatient.name}</p>
          <p className='text-sm'><span className='font-semibold'>Age:</span> {selectedPatient.age}</p>
          <p className='text-sm'><span className='font-semibold'>Diagnosis:</span> {selectedPatient.diagnosis}</p>
          <p className='text-sm'><span className='font-semibold'>Appointment:</span> {selectedPatient.appointment}</p>
          <p className='text-sm'><span className='font-semibold'>Prescription:</span> {selectedPatient.prescription}</p>
          <p className='text-sm'><span className='font-semibold'>Status:</span> {selectedPatient.status}</p>
        </div>
      </Panel>
    </DashboardLayout>
  )
}

export default Doctor
