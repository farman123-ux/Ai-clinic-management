import { createContext, useContext, useEffect, useState } from 'react'

const ClinicContext = createContext(null)

const defaultUsers = [
  { name: 'Dr. Ayesha', role: 'Doctor', email: 'doctor@clinic.com', status: 'Active' },
  { name: 'Nida Frontdesk', role: 'Receptionist', email: 'receptionist@clinic.com', status: 'Active' },
  { name: 'Ali Khan', role: 'Patient', email: 'patient@clinic.com', status: 'Pending' },
]

const defaultPatients = [
  {
    id: '1',
    name: 'Ali Khan',
    email: 'patient@clinic.com',
    age: '32',
    doctor: 'Dr. Ayesha',
    diagnosis: 'Flu and fever',
    appointment: '10:30 AM',
    prescription: 'Paracetamol, rest, fluids',
    status: 'Waiting',
  },
  {
    id: '2',
    name: 'Sara Ahmed',
    email: 'sara@clinic.com',
    age: '26',
    doctor: 'Dr. Hamza',
    diagnosis: 'Migraine',
    appointment: '12:00 PM',
    prescription: 'Pain relief medicine',
    status: 'Checked',
  },
]

const defaultQueue = [
  { id: 'q1', name: 'Ali Khan', age: '32', phone: '0300-1234567', doctor: 'Dr. Ayesha', time: '10:30 AM', status: 'Waiting' },
  { id: 'q2', name: 'Sara Ahmed', age: '26', phone: '0311-9876543', doctor: 'Dr. Hamza', time: '12:00 PM', status: 'Checked' },
]

export function ClinicProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('clinic_users')
      return saved ? JSON.parse(saved) : defaultUsers
    } catch {
      return defaultUsers
    }
  })

  const [patients, setPatients] = useState(() => {
    try {
      const saved = localStorage.getItem('clinic_patients')
      return saved ? JSON.parse(saved) : defaultPatients
    } catch {
      return defaultPatients
    }
  })

  const [queue, setQueue] = useState(() => {
    try {
      const saved = localStorage.getItem('clinic_queue')
      return saved ? JSON.parse(saved) : defaultQueue
    } catch {
      return defaultQueue
    }
  })

  useEffect(() => {
    localStorage.setItem('clinic_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('clinic_patients', JSON.stringify(patients))
  }, [patients])

  useEffect(() => {
    localStorage.setItem('clinic_queue', JSON.stringify(queue))
  }, [queue])

  const addUser = (newUser) => {
    const userWithStatus = { ...newUser, status: newUser.status || 'Active' }
    setUsers((prev) => [userWithStatus, ...prev])
  }

  const addPatient = (newPatient) => {
    const formatted = {
      id: Date.now().toString(),
      status: newPatient.status || 'Pending',
      prescription: newPatient.prescription || 'Pending doctor consultation',
      ...newPatient,
    }
    setPatients((prev) => [formatted, ...prev])
  }

  const updatePatient = (nameOrId, updatedFields) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === nameOrId || p.name === nameOrId ? { ...p, ...updatedFields } : p))
    )
  }

  const addQueueItem = (newItem) => {
    const formatted = {
      id: `q_${Date.now()}`,
      status: 'Waiting',
      ...newItem,
    }
    setQueue((prev) => [formatted, ...prev])

    // Also register patient if not already existing
    const exists = patients.some((p) => p.name.toLowerCase() === newItem.name.toLowerCase())
    if (!exists) {
      addPatient({
        name: newItem.name,
        age: newItem.age,
        doctor: newItem.doctor || 'Unassigned',
        appointment: newItem.time || 'Today',
        diagnosis: 'Pending assessment',
        prescription: 'Pending',
        status: 'Waiting',
      })
    }
  }

  return (
    <ClinicContext.Provider
      value={{
        users,
        patients,
        queue,
        addUser,
        addPatient,
        updatePatient,
        addQueueItem,
      }}
    >
      {children}
    </ClinicContext.Provider>
  )
}

export function useClinic() {
  const context = useContext(ClinicContext)
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider')
  }
  return context
}
