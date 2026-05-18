import React, { useState } from 'react'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const roles = ['Admin', 'Doctor', 'Receptionist', 'Patient']

function Login() {
    const [formType, setFormType] = useState('Login')
    const [role, setRole] = useState('Admin')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target

        const fullName = form.fullName?.value
        const email = form.user_email.value
        const password = form.user_password.value

        console.log({ role, email, password })

        if (formType === 'SignUp') {
            console.log('Signup Data', {
                role,
                fullName,
                email,
                password,
            })
        } else {
            console.log('Login Data', {
                role,
                email,
                password,
            })
        }

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
                <h1 className='text-3xl font-bold'>Welcome to ClinicAI</h1>
                <p className='text-black/70 text-sm mt-1'>
                    AI-Powered Clinic Management System
                </p>
            </div>

            <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.2)]'>

                <h1 className='text-2xl font-bold text-center mb-4'>
                    {role} {formType}
                </h1>

                <form onSubmit={handleSubmit} autoComplete='off' className='space-y-4'>

                    {formType === 'SignUp' && (
                        <input
                            type='text'
                            name='fullName'
                            placeholder={`Enter ${role} full name`}
                            className='w-full border-gray-300 outline-none border p-2 rounded-xl focus:border-blue-500 transition'
                            autoComplete='off'
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
                        />
                    </div>

                    <div className='flex items-center gap-2 border border-gray-300 p-2 rounded-xl focus-within:border-blue-500 transition'>
                        <RiLockPasswordLine className='text-gray-500' />
                        <input
                            type='password'
                            name='user_password'
                            placeholder={`Enter ${role} password`}
                            className='w-full outline-none'
                            autoComplete='new-password'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-teal-600 text-white py-2 rounded-xl'
                    >
                        {formType} as {role}
                    </button>
                </form>

                <p className='text-center mt-3 text-sm'>
                    {formType === 'Login'
                        ? "Don't have an account?"
                        : 'Already have an account?'}

                    <button
                        type='button'
                        className='ml-1 text-teal-600 font-semibold'
                        onClick={() =>
                            setFormType(formType === 'Login' ? 'SignUp' : 'Login')
                        }
                    >
                        {formType === 'Login' ? 'SignUp' : 'Login'}
                    </button>
                </p>

                <div className='grid grid-cols-2 gap-3 mt-5'>
                    {roles.map((item) => (
                        <button
                            key={item}
                            type='button'
                            onClick={() => setRole(item)}
                            className={`shadow-[0px_0px_10px_rgba(0,0,0,0.1)] p-3 rounded-xl text-left text-sm transition ${
                                role === item
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-white'
                            }`}
                        >
                            <div className='font-semibold'>{item}</div>
                            <p className='mt-1 text-xs'>
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