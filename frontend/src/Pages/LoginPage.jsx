import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/Axios';

function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        setError("")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axiosInstance.post("/auth/login", form);

            navigate("/video/home");
        } catch (error) {
            console.error("Error in login ", error)
            setError(error?.response?.data)
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
        <form 
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded shadow-md w-full max-w-sm'
        >
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            {error && (
                <div className='bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm'>{error} </div>
            )}

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
                <input 
                type="email" 
                name="email" 
                value={form.email}
                onChange={handleChange}
                required 
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'/>
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
                <input 
                type="password"
                 name="password" 
                 value={form.password}
                 onChange={handleChange}
                 required
                 className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'/>
            </div>

            <button type='submit' disabled={loading}
            className='w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700 transition'>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    </div>
  )
}

export default LoginPage