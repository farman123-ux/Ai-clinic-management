import { useState } from 'react'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useClinic } from '../context/ClinicContext'

const roles = ['Admin', 'Doctor', 'Receptionist', 'Patient']

function Login() {
    const [formType, setFormType] = useState('Login')
    const [role, setRole] = useState('Admin')

    const navigate = useNavigate()
    const { login } = useAuth()
    const { addUser } = useClinic()

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target

        const fullName = form.fullName?.value?.trim() || `${role} User`
        const email = form.user_email.value.trim()

        const userData = {
            name: fullName,
            email: email || `${role.toLowerCase()}@clinic.com`,
            role,
        }

        if (formType === 'SignUp') {
            addUser({
                name: fullName,
                email: userData.email,
                role,
                status: 'Active',
            })
        }

        // Save session in AuthContext (which syncs to localStorage)
        login(userData)

        form.reset()

        const routes = {
            Admin: '/admin',
            Doctor: '/doctor',
            Receptionist: '/receptionist',
            Patient: '/patient',
        }

        navigate(routes[role])
    }

    return (
        <div className='min-h-screen flex flex-col py-10 bg-gray-100 items-center px-4'>

            <div className='w-full max-w-md text-center p-4 rounded mb-4'>
                <h1 className='text-3xl font-bold text-gray-800'>Welcome to ClinicAI</h1>
                <p className='text-gray-600 text-sm mt-1'>
                    AI-Powered Clinic Management System
                </p>
            </div>

            <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.2)]'>

                <h1 className='text-2xl font-bold text-center mb-4 text-gray-800'>
                    {role} {formType}
                </h1>

                <form onSubmit={handleSubmit} autoComplete='off' className='space-y-4'>

                    {formType === 'SignUp' && (
                        <input
                            type='text'
                            name='fullName'
                            placeholder={`Enter ${role} full name`}
                            className='w-full border-gray-300 outline-none border p-2 rounded-xl focus:border-blue-500 transition text-gray-700'
                            autoComplete='off'
                            required
                        />
                    )}

                    <div className='flex items-center gap-2 border border-gray-300 p-2 rounded-xl focus-within:border-blue-500 transition'>
                        <MdOutlineMailOutline className='text-gray-500' />
                        <input
                            type='email'
                            name='user_email'
                            placeholder={`Enter ${role} email`}
                            className='w-full outline-none text-gray-700'
                            autoComplete='off'
                            required
                        />
                    </div>

                    <div className='flex items-center gap-2 border border-gray-300 p-2 rounded-xl focus-within:border-blue-500 transition'>
                        <RiLockPasswordLine className='text-gray-500' />
                        <input
                            type='password'
                            name='user_password'
                            placeholder={`Enter ${role} password`}
                            className='w-full outline-none text-gray-700'
                            autoComplete='new-password'
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl transition cursor-pointer'
                    >
                        {formType} as {role}
                    </button>
                </form>

                <p className='text-center mt-4 text-sm text-gray-600'>
                    {formType === 'Login'
                        ? "Don't have an account?"
                        : 'Already have an account?'}

                    <button
                        type='button'
                        className='ml-1.5 text-teal-600 font-semibold hover:underline cursor-pointer'
                        onClick={() =>
                            setFormType(formType === 'Login' ? 'SignUp' : 'Login')
                        }
                    >
                        {formType === 'Login' ? 'SignUp' : 'Login'}
                    </button>
                </p>

                <div className='grid grid-cols-2 gap-3 mt-6'>
                    {roles.map((item) => (
                        <button
                            key={item}
                            type='button'
                            onClick={() => setRole(item)}
                            className={`shadow-[0px_0px_10px_rgba(0,0,0,0.08)] p-3 rounded-xl text-left text-sm transition cursor-pointer ${
                                role === item
                                    ? 'bg-teal-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <div className='font-semibold'>{item}</div>
                            <p className={`mt-0.5 text-xs ${role === item ? 'text-teal-100' : 'text-gray-400'}`}>
                                {item.toLowerCase()}.clinic.com
                            </p>
                        </button>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Login