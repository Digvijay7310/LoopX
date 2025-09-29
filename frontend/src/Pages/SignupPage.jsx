import React, { useState } from 'react';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';

function SignupPage() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("username", username);
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("password", password);

        if (avatar) formData.append("avatar", avatar);
        if (coverImage) formData.append("coverImage", coverImage);

        try {
            const res = await axiosInstance.post("/auth/signup", formData);
            if (res.data?.data) {
                toast.success("Successfully signed up!");
                navigate("/");
            } else {
                toast.error("Signup failed.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>

                {/* Username */}
                <div className="flex items-center border rounded px-3 py-2">
                    <FiUser className="mr-2 text-gray-500 " />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full outline-none"
                        required
                    />
                </div>

                {/* Full Name */}
                <div className="flex items-center border rounded px-3 py-2">
                    <FiUser className="mr-2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full outline-none"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex items-center border rounded px-3 py-2">
                    <FiMail className="mr-2 text-gray-500" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full outline-none"
                        required
                    />
                </div>

                {/* Password */}
                
<div className="flex items-center border rounded px-3 py-2 relative">
    <FiLock className="mr-2 text-gray-500" />
    <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full outline-none pr-10"
        required
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

                {/* Avatar Upload */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600">
                        <FiUpload />
                        Upload Avatar
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setAvatar(file);
                                setAvatarPreview(URL.createObjectURL(file));
                            }}
                            className="hidden"
                        />
                    </label>
                    {avatarPreview && (
                        <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="w-20 h-20 object-cover rounded-full"
                        />
                    )}
                </div>

                {/* Cover Image Upload */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600">
                        <FiUpload />
                        Upload Cover Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setCoverImage(file);
                                setCoverImagePreview(URL.createObjectURL(file));
                            }}
                            className="hidden"
                        />
                    </label>
                    {coverImagePreview && (
                        <img
                            src={coverImagePreview}
                            alt="Cover Preview"
                            className="w-full h-32 object-cover rounded"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    );
}

export default SignupPage;
