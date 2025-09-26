import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/Axios'
import { toast } from 'react-toastify'

function UpdateProfilePage() {
    /*
  const { username } = useParams() // get username from URL params
  const [user, setUser] = useState(null)
  const [fullName, setFullName] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

 useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get(`/users/@${username}`)
        if (res.data.data) {
          const u = res.data.data.user
          setUser(u)
          setFullName(u.fullName || '')
          setAvatarPreview(u.avatar || '')
          setCoverPreview(u.coverImage || '')
        }
      } catch (error) {
        console.error('Error in fetchUser:', error)
        toast.error('Cannot fetch user data now')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [username])

  // Avatar file select + preview
  const handleAvatarChange = e => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  // Cover image file select + preview
  const handleCoverChange = e => {
    const file = e.target.files[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  // Submit update profile
  const handleSubmit = async e => {
    e.preventDefault()
    if (!fullName.trim()) {
      toast.error('Full name cannot be empty')
      return
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('fullName', fullName)
      if (avatarFile) formData.append('avatar', avatarFile)
      if (coverFile) formData.append('coverImage', coverFile)

      await axiosInstance.patch('/users/profile/update', formData)

      toast.success('Profile updated successfully')
      // Optionally refetch user here if you want to show latest info
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setSubmitting(false)
    }
  } */

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile for edit...</p>
  if (!user) return <p className="text-center mt-10 text-red-500">User data not available</p>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>

      {/* Cover Image Preview */}
      {coverPreview && (
        <div className="mb-6 h-48 rounded overflow-hidden shadow-inner">
          <img
            src={coverPreview}
            alt="Cover preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username (readonly) */}
        <div>
          <label className="block font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Full Name (editable) */}
        <div>
          <label className="block font-medium mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Avatar Preview and Upload */}
        <div>
          <label className="block font-medium mb-1" htmlFor="avatar">
            Avatar
          </label>
          {avatarPreview && (
            <div className="w-32 h-32 rounded-full overflow-hidden mb-2 border border-gray-300">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block"
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block font-medium mb-1" htmlFor="coverImage">
            Cover Image
          </label>
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="block"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-3 rounded-md text-white font-semibold transition ${
            submitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {submitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}

export default UpdateProfilePage
