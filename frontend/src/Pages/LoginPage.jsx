import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../utils/Axios'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.post("/api/auth/login", form);
            navigate("/video/home");
        } catch (error) {
            console.error("Error in login ", error);
            setError(error?.response?.data?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "LoopX - User Login"
    }, [])

    return (
        <div className='min-h-screen flex items-center justify-center bg-red-100'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-6 rounded shadow-md w-full max-w-sm space-y-5'
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

                {error && (
                    <div className='bg-red-100 text-red-700 px-3 py-2 rounded text-sm'>{error}</div>
                )}

                {/* Email Field */}
                <div className="flex items-center ring ring-red-600 rounded px-3 py-2">
                    <FiMail className="mr-2 text-gray-500" />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full outline-none"
                    />
                </div>

                {/* Password Field */}
                <div className="flex items-center ring ring-red-600 rounded px-3 py-2 relative">
                    <FiLock className="mr-2 text-gray-500" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full outline-none pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 text-gray-500 focus:outline-none"
                        tabIndex={-1}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-200'
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <span className='mt-2 flex justify-center items-center gap-1 text-xs'> Don't have an account ?
            <Link to="/auth/signup" className='text-blue-500 hover:underline'> Signup</Link>
        </span><br />
                <span className='mt-2 flex justify-center items-center gap-1 text-xs'> Admin Login ? 
            <Link to="/admin/login" className='text-blue-500 hover:underline'> Click here</Link>
        </span>
            </form>
        </div>
    );
}

export default LoginPage;
