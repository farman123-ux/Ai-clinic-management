import React from 'react'
import { DashboardHeader, DashboardLayout, Panel, StatCard } from './DashboardComponents'

const patient = {
  name: 'Ali Khan',
  age: '32',
  doctor: 'Dr. Ayesha',
  diagnosis: 'Flu and fever',
  appointment: '10:30 AM',
  prescription: 'Paracetamol, rest, fluids',
  status: 'Improving',
}

function Patient() {
  return (
    <DashboardLayout>
      <DashboardHeader
        subtitle='Your profile, diagnosis, appointments, and medicines'
        title='Patient Dashboard'
      />

      <div className='mt-6 grid gap-4 md:grid-cols-3'>
        <StatCard title='Patient Name' value={patient.name} />
        <StatCard title='Next Appointment' value={patient.appointment} />
        <StatCard title='Doctor' value={patient.doctor} />
      </div>

      <div className='mt-6 grid gap-6 lg:grid-cols-2'>
        <Panel title='Medical Details'>
          <div className='mt-4 space-y-3 text-sm'>
            <p><span className='font-semibold text-gray-700'>Age:</span> {patient.age}</p>
            <p><span className='font-semibold text-gray-700'>Diagnosis:</span> {patient.diagnosis}</p>
            <p><span className='font-semibold text-gray-700'>Prescription:</span> {patient.prescription}</p>
            <p><span className='font-semibold text-gray-700'>Status:</span> {patient.status}</p>
          </div>
        </Panel>

        <Panel title='Book Appointment'>
          <form className='mt-4 space-y-3'>
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' type='date' />
            <input className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' type='time' />
            <textarea className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none' placeholder='Write your problem' rows='3'></textarea>
            <button className='w-full rounded-md bg-teal-600 py-2 font-semibold text-white' type='button'>
              Request Appointment
            </button>
          </form>
        </Panel>
      </div>
    </DashboardLayout>
  )
}

export default Patient
