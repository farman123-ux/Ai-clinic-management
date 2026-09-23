import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useClinic } from '../../context/ClinicContext'
import { DashboardHeader, DashboardLayout, Panel, StatCard } from './DashboardComponents'

function Patient() {
  const { user } = useAuth()
  const { patients, addQueueItem } = useClinic()

  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [problemDescription, setProblemDescription] = useState('')
  const [submittedMessage, setSubmittedMessage] = useState('')

  // Find matching patient record by name or email, or default to first record
  const currentPatient =
    patients.find(
      (p) =>
        (p.name && user?.name && p.name.toLowerCase() === user.name.toLowerCase()) ||
        (p.email && user?.email && p.email.toLowerCase() === user.email.toLowerCase())
    ) ||
    patients[0] || {
      name: user?.name || 'Patient',
      age: 'N/A',
      doctor: 'Dr. Ayesha',
      diagnosis: 'General Checkup',
      appointment: 'Not scheduled',
      prescription: 'No current prescription',
      status: 'Active',
    }

  const handleRequestAppointment = (e) => {
    e.preventDefault()
    if (!appointmentDate || !appointmentTime) return

    const timeString = `${appointmentDate} @ ${appointmentTime}`
    addQueueItem({
      name: currentPatient.name,
      age: currentPatient.age !== 'N/A' ? currentPatient.age : '30',
      phone: '0300-0000000',
      doctor: currentPatient.doctor || 'Dr. Ayesha',
      time: timeString,
    })

    setSubmittedMessage(`Appointment requested for ${timeString}!`)
    setAppointmentDate('')
    setAppointmentTime('')
    setProblemDescription('')

    setTimeout(() => {
      setSubmittedMessage('')
    }, 4000)
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        subtitle='Your profile, diagnosis, appointments, and medicines'
        title='Patient Dashboard'
      />

      <div className='grid gap-4 md:grid-cols-3'>
        <StatCard title='Patient Name' value={currentPatient.name} />
        <StatCard title='Next Appointment' value={currentPatient.appointment || '10:30 AM'} />
        <StatCard title='Doctor' value={currentPatient.doctor || 'Dr. Ayesha'} />
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Panel title='Medical Details'>
          <div className='mt-4 space-y-3 text-sm'>
            <div className='p-3 bg-gray-50 rounded-md border border-gray-200 space-y-2'>
              <p><span className='font-semibold text-gray-700'>Age:</span> {currentPatient.age}</p>
              <p><span className='font-semibold text-gray-700'>Diagnosis:</span> {currentPatient.diagnosis}</p>
              <p><span className='font-semibold text-gray-700'>Prescription:</span> {currentPatient.prescription}</p>
              <p>
                <span className='font-semibold text-gray-700'>Status:</span>{' '}
                <span className='inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-0.5 rounded'>
                  {currentPatient.status}
                </span>
              </p>
            </div>
          </div>
        </Panel>

        <Panel title='Book Appointment'>
          {submittedMessage && (
            <div className='mt-3 p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs rounded-md font-medium'>
              {submittedMessage}
            </div>
          )}
          <form className='mt-4 space-y-3' onSubmit={handleRequestAppointment}>
            <div>
              <label className='block text-xs font-medium text-gray-600 mb-1'>Date</label>
              <input
                className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
                type='date'
                value={appointmentDate}
              />
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-600 mb-1'>Time</label>
              <input
                className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
                type='time'
                value={appointmentTime}
              />
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-600 mb-1'>Symptoms / Notes</label>
              <textarea
                className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-500 transition'
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder='Write your medical issue or query'
                rows='3'
                value={problemDescription}
              ></textarea>
            </div>
            <button
              className='w-full rounded-md bg-teal-600 hover:bg-teal-700 py-2 font-semibold text-white transition cursor-pointer'
              type='submit'
            >
              Request Appointment
            </button>
          </form>
        </Panel>
      </div>
    </DashboardLayout>
  )
}

export default Patient
