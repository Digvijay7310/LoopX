import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Username check
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Email check
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'LoopX - Signup';
  }, []);

  // Debounce for username
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (username.length >= 3) {
        checkUsernameAvailability(username);
      } else {
        setIsUsernameAvailable(null);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [username]);

  // Debounce for email
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (email.includes('@') && email.length > 5) {
        checkEmailAvailability(email);
      } else {
        setIsEmailAvailable(null);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [email]);

  const checkUsernameAvailability = async (name) => {
    setCheckingUsername(true);
    try {
      const res = await axiosInstance.get(`/api/auth/check-username`, {
        params: { username: name },
      });
      setIsUsernameAvailable(res.data.available);
    } catch (err) {
      console.error('Username check failed:', err);
      setIsUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const checkEmailAvailability = async (email) => {
    setCheckingEmail(true);
    try {
      const res = await axiosInstance.get(`/api/auth/check-email`, {
        params: { email },
      });
      setIsEmailAvailable(res.data.available);
    } catch (err) {
      console.error('Email check failed:', err);
      setIsEmailAvailable(null);
    } finally {
      setCheckingEmail(false);
    }
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

    if (password.length < 5) {
      toast.error('Password must be at least 5 characters long.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);
    if (coverImage) formData.append('coverImage', coverImage);

    try {
      const res = await axiosInstance.post('/api/auth/signup', formData);
      if (res.data?.data) {
        toast.success('Successfully signed up!');
        navigate('/');
      } else {
        toast.error('Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl px-8 py-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>

        {/* Username */}
        <div className="flex flex-col">
          <div className="flex items-center ring ring-red-600 rounded px-3 py-2">
            <FiUser className="mr-2 text-gray-500" />
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="false"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>
          {username.length >= 3 && (
            <div className="text-sm mt-1 ml-1">
              {checkingUsername && <span className="text-gray-500">Checking availability...</span>}
              {!checkingUsername && isUsernameAvailable === true && (
                <span className="text-green-600">✅ Username is available</span>
              )}
              {!checkingUsername && isUsernameAvailable === false && (
                <span className="text-red-600">❌ Username is taken</span>
              )}
            </div>
          )}
        </div>

        {/* Full Name */}
        <div className="flex items-center ring ring-red-600 rounded px-3 py-2">
          <FiUser className="mr-2 text-gray-500" />
          <label htmlFor="fullName"></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <div className="flex items-center ring ring-red-600 rounded px-3 py-2">
            <FiMail className="mr-2 text-gray-500" />
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>
          {email.length > 5 && (
            <div className="text-sm mt-1 ml-1">
              {checkingEmail && <span className="text-gray-500">Checking email...</span>}
              {!checkingEmail && isEmailAvailable === true && (
                <span className="text-green-600">✅ Email is available</span>
              )}
              {!checkingEmail && isEmailAvailable === false && (
                <span className="text-red-600">❌ Email already in use</span>
              )}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <div className="flex items-center ring ring-red-600 rounded px-3 py-2 relative">
            <FiLock className="mr-2 text-gray-500" />
            <label htmlFor="password"></label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-gray-500 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {username && password.length > 0 && password.length < 5 && (
            <p className="text-sm text-red-600 ml-1 mt-1">
              Password must be at least 5 characters long
            </p>
          )}
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="avatar"
            className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600"
          >
            <FiUpload />
            Upload Avatar
            <input
              type="file"
              id="avatar"
              name="avatar"
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
          <label
            htmlFor="coverImage"
            className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600"
          >
            <FiUpload />
            Upload Cover Image
            <input
              type="file"
              id="coverImage"
              name="coverImage"
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
          disabled={
            loading ||
            isUsernameAvailable === false ||
            isEmailAvailable === false ||
            password.length < 5
          }
          className={`w-full ${
            loading ||
            isUsernameAvailable === false ||
            isEmailAvailable === false ||
            password.length < 5
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } text-white font-semibold py-2 px-4 rounded transition duration-200`}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        <span className="mt-2 flex justify-center items-center gap-1">
          Already have an account?
          <Link to="/auth/login" className="text-blue-500">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignupPage;
