import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';

function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'LoopX - Signup';
  }, []);

  // Debounce username check
  useEffect(() => {
    const delay = setTimeout(() => {
      if (form.username.length >= 3) checkUsernameAvailability(form.username);
      else setIsUsernameAvailable(null);
    }, 500);
    return () => clearTimeout(delay);
  }, [form.username]);

  // Debounce email check
  useEffect(() => {
    const delay = setTimeout(() => {
      if (form.email.includes('@') && form.email.length > 5) checkEmailAvailability(form.email);
      else setIsEmailAvailable(null);
    }, 500);
    return () => clearTimeout(delay);
  }, [form.email]);

  const checkUsernameAvailability = async (username) => {
    setCheckingUsername(true);
    try {
      const res = await axiosInstance.get('/auth/check-username', { params: { username } });
      setIsUsernameAvailable(res.data.available);
    } catch {
      setIsUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const checkEmailAvailability = async (email) => {
    setCheckingEmail(true);
    try {
      const res = await axiosInstance.get('/auth/check-email', { params: { email } });
      setIsEmailAvailable(res.data.available);
    } catch {
      setIsEmailAvailable(null);
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isUsernameAvailable === false) {
      toast.error('Username is already taken.');
      setLoading(false);
      return;
    }
    if (isEmailAvailable === false) {
      toast.error('Email is already in use.');
      setLoading(false);
      return;
    }
    if (form.password.length < 5) {
      toast.error('Password must be at least 5 characters.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('fullName', form.fullName);
    formData.append('email', form.email);
    formData.append('password', form.password);
    if (avatar) formData.append('avatar', avatar);
    if (coverImage) formData.append('coverImage', coverImage);

    try {
      const res = await axiosInstance.post('/auth/signup', formData);
      if (res.data?.data) {
        toast.success('Successfully signed up!');
        navigate('/auth/login');
        setForm({ username: '', fullName: '', email: '', password: '' }); // clear after submit
        setAvatar(null);
        setAvatarPreview(null);
        setCoverImage(null);
        setCoverImagePreview(null);
      } else toast.error('Signup failed.');
    } catch {
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl px-8 py-6 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>

        {/* Username */}
        <div className="flex flex-col">
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-600 transition-colors duration-200 py-2">
            <FiUser className="mr-2 text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full outline-none placeholder-gray-400 focus:placeholder-gray-300"
              required
            />
          </div>
          {form.username.length >= 3 && (
            <div className="text-sm mt-1 ml-1">
              {checkingUsername && <span className="text-gray-500">Checking...</span>}
              {!checkingUsername && isUsernameAvailable === true && (
                <span className="text-green-600">✅ Username available</span>
              )}
              {!checkingUsername && isUsernameAvailable === false && (
                <span className="text-red-600">❌ Username taken</span>
              )}
            </div>
          )}
        </div>

        {/* Full Name */}
        <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-600 transition-colors duration-200 py-2">
          <FiUser className="mr-2 text-gray-500" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full outline-none placeholder-gray-400 focus:placeholder-gray-300"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-600 transition-colors duration-200 py-2">
            <FiMail className="mr-2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full outline-none placeholder-gray-400 focus:placeholder-gray-300"
              required
            />
          </div>
          {form.email.length > 5 && (
            <div className="text-sm mt-1 ml-1">
              {checkingEmail && <span className="text-gray-500">Checking...</span>}
              {!checkingEmail && isEmailAvailable === true && (
                <span className="text-green-600">✅ Email available</span>
              )}
              {!checkingEmail && isEmailAvailable === false && (
                <span className="text-red-600">❌ Email in use</span>
              )}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="flex items-center border-b-2 border-gray-300 focus-within:border-red-600 transition-colors duration-200 py-2 relative">
          <FiLock className="mr-2 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full outline-none placeholder-gray-400 focus:placeholder-gray-300 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 text-gray-500 focus:outline-none pr-2"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600">
            <FiUpload /> Upload Avatar
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
            <FiUpload /> Upload Cover Image
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

        {/* Submit */}
        <button
          type="submit"
          disabled={
            loading ||
            isUsernameAvailable === false ||
            isEmailAvailable === false ||
            form.password.length < 5
          }
          className={`w-full ${
            loading ||
            isUsernameAvailable === false ||
            isEmailAvailable === false ||
            form.password.length < 5
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } text-white font-semibold py-2 px-4 rounded transition duration-200`}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        <span className="flex justify-center items-center gap-1 text-sm">
          Already have an account?
          <Link to="/auth/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignupPage;
