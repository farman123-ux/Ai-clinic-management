import { useState } from 'react'
import { useClinic } from '../../context/ClinicContext'
import { DashboardHeader, DashboardLayout, Panel, StatCard } from './DashboardComponents'

const emptyPatient = {
  name: '',
  age: '',
  phone: '',
  doctor: '',
  time: '',
}

function Receptionist() {
  const { queue, addQueueItem } = useClinic()
  const [patient, setPatient] = useState(emptyPatient)

  const handleChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value })
  }

  const handleCreatePatient = (event) => {
    event.preventDefault()
    addQueueItem(patient)
    setPatient(emptyPatient)
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        subtitle='Receptionist can add patients and assign doctors'
        title='Reception Dashboard'
      />

      <div className='grid gap-4 md:grid-cols-3'>
        <StatCard title='Registered Patients' value={queue.length} />
        <StatCard title='Appointments' value={queue.length} />
        <StatCard title='Waiting' value={queue.filter((q) => q.status === 'Waiting').length} />
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Panel title='Add Patient to Queue'>
          <form className='mt-4 space-y-3' onSubmit={handleCreatePatient}>
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='name'
              onChange={handleChange}
              placeholder='Patient name'
              required
              type='text'
              value={patient.name}
            />
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='age'
              onChange={handleChange}
              placeholder='Age'
              required
              type='number'
              value={patient.age}
            />
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='phone'
              onChange={handleChange}
              placeholder='Phone number'
              required
              type='text'
              value={patient.phone}
            />
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='doctor'
              onChange={handleChange}
              placeholder='Assigned Doctor name'
              required
              type='text'
              value={patient.doctor}
            />
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='time'
              onChange={handleChange}
              placeholder='Appointment time (e.g. 10:30 AM)'
              required
              type='text'
              value={patient.time}
            />
            <button
              className='w-full rounded-md bg-teal-600 hover:bg-teal-700 py-2 font-semibold text-white transition cursor-pointer'
              type='submit'
            >
              Add to Queue
            </button>
          </form>
        </Panel>

        <Panel title="Today's Queue">
          <div className='mt-4 max-h-80 overflow-y-auto space-y-3 pr-1'>
            {queue.length === 0 ? (
              <p className='text-sm text-gray-500 text-center py-4'>No patients in queue.</p>
            ) : (
              queue.map((item, idx) => (
                <div
                  className='rounded-md border border-gray-200 p-3 bg-white hover:border-teal-300 transition'
                  key={`${item.name}-${idx}`}
                >
                  <div className='flex justify-between items-center'>
                    <p className='font-semibold text-gray-800'>{item.name}</p>
                    <span className='text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded font-medium'>
                      {item.time}
                    </span>
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>
                    Age: {item.age} &bull; Phone: {item.phone}
                  </p>
                  <p className='text-xs text-gray-600 font-medium mt-1'>Doctor: {item.doctor}</p>
                </div>
              ))
            )}
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  )
}

export default Receptionist
