import { useState } from 'react'
import { useClinic } from '../../context/ClinicContext'
import { DashboardHeader, DashboardLayout, Panel, StatCard } from './DashboardComponents'

const emptyPatient = {
  name: '',
  age: '',
  diagnosis: '',
  appointment: '',
  prescription: '',
  status: 'Waiting',
}

function Doctor() {
  const { patients, addPatient } = useClinic()
  const [selectedPatient, setSelectedPatient] = useState(() => patients[0] || null)
  const [newPatient, setNewPatient] = useState(emptyPatient)

  const handleChange = (event) => {
    setNewPatient({ ...newPatient, [event.target.name]: event.target.value })
  }

  const handleAddPatient = (event) => {
    event.preventDefault()
    addPatient(newPatient)
    setSelectedPatient(newPatient)
    setNewPatient(emptyPatient)
  }

  const activeSelected = selectedPatient || patients[0] || null

  return (
    <DashboardLayout>
      <DashboardHeader
        subtitle='Doctor can add patients and view diagnosis details'
        title='Doctor Dashboard'
      />

      <div className='grid gap-4 md:grid-cols-3'>
        <StatCard title='Patients' value={patients.length} />
        <StatCard title='Appointments' value={patients.filter((p) => p.appointment).length} />
        <StatCard title='Pending' value={patients.filter((p) => p.status === 'Pending' || p.status === 'Waiting').length} />
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Panel title='Add Patient Record'>
          <form className='mt-4 space-y-3' onSubmit={handleAddPatient}>
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='name'
              onChange={handleChange}
              placeholder='Patient name'
              required
              type='text'
              value={newPatient.name}
            />
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='age'
              onChange={handleChange}
              placeholder='Age'
              required
              type='number'
              value={newPatient.age}
            />
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='diagnosis'
              onChange={handleChange}
              placeholder='Diagnosis'
              required
              type='text'
              value={newPatient.diagnosis}
            />
            <input
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='appointment'
              onChange={handleChange}
              placeholder='Appointment time'
              required
              type='text'
              value={newPatient.appointment}
            />
            <textarea
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
              name='prescription'
              onChange={handleChange}
              placeholder='Prescription'
              required
              rows='3'
              value={newPatient.prescription}
            ></textarea>
            <button
              className='w-full rounded-md bg-teal-600 hover:bg-teal-700 py-2 font-semibold text-white transition cursor-pointer'
              type='submit'
            >
              Add Patient Record
            </button>
          </form>
        </Panel>

        <Panel title='Patient List'>
          <div className='mt-4 max-h-72 overflow-y-auto space-y-2.5 pr-1'>
            {patients.map((patient, idx) => (
              <button
                className={`w-full rounded-md border p-3 text-left text-sm transition cursor-pointer ${
                  activeSelected?.name === patient.name
                    ? 'border-teal-600 bg-teal-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-teal-300'
                }`}
                key={`${patient.name}-${idx}`}
                onClick={() => setSelectedPatient(patient)}
                type='button'
              >
                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-gray-800'>{patient.name}</p>
                  <span className='text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded'>
                    {patient.status}
                  </span>
                </div>
                <p className='text-xs text-gray-500 mt-1'>Diagnosis: {patient.diagnosis}</p>
              </button>
            ))}
          </div>
        </Panel>
      </div>

      {activeSelected && (
        <Panel title='Patient Medical Details'>
          <div className='mt-2 grid gap-4 sm:grid-cols-3 text-sm'>
            <p><span className='font-semibold text-gray-700'>Name:</span> {activeSelected.name}</p>
            <p><span className='font-semibold text-gray-700'>Age:</span> {activeSelected.age}</p>
            <p><span className='font-semibold text-gray-700'>Diagnosis:</span> {activeSelected.diagnosis}</p>
            <p><span className='font-semibold text-gray-700'>Appointment:</span> {activeSelected.appointment}</p>
            <p><span className='font-semibold text-gray-700'>Prescription:</span> {activeSelected.prescription}</p>
            <p><span className='font-semibold text-gray-700'>Status:</span> {activeSelected.status}</p>
          </div>
        </Panel>
      )}
    </DashboardLayout>
  )
}

export default Doctor
