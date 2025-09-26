import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/Axios'
import { Link, useParams } from 'react-router-dom'
import { FaBell, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'

function UserProfilePage() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [videos, setVideos] = useState([])
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserAndVideos = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axiosInstance.get(`/users/@${username}`)
        if (res.data.data) {
          setUser(res.data.data.user)
          setVideos(res.data.data.videos)
          // Assuming API returns if current user is subscribed:
          setSubscribed(res.data.data.user.isSubscribed || false)
        } else {
          setError('User data not found')
        }
      } catch (err) {
        setError('Failed to fetch user data')
        console.error('Error fetching user:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUserAndVideos()
  }, [username])

  const handleSubscribeToggle = async () => {
    if (!user) return
    try {
      await axiosInstance.post(`/video/subscriber/${videos.owner._id}`)
      setSubscribed(!subscribed)
      toast.success(subscribed ? 'Unsubscribed' : 'Subscribed')
    } catch (err) {
      toast.error('Failed to toggle subscription')
      console.error('Error toggle subscription:', err)
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading user details...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
  if (!user) return <p className="text-center mt-10 text-gray-700">User not found</p>

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Cover Image */}
      {user.coverImage && (
        <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden mb-6">
          <img
            src={user.coverImage}
            alt={`${user.username}'s cover`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* User Info */}
      <div className="flex flex-row items-center md:items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden border border-red-600 flex-shrink-0">
          <img
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
          <p className="text-red-600 text-lg font-semibold">@{user.username}</p>

          <p className="mt-1 text-gray-500">{user.email}</p>
          {user.myLink && (
            <a
              href={user.myLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              {user.myLink}
            </a>
          )}
        </div>

        

        {/* Actions */}
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/users/profile/update"
            className="text-red-600 hover:text-red-800 transition"
            title="Edit Profile"
          >
            <FaEdit size={24} />
          </Link>

        
        </div>

        
      </div>
        <button
            type="button"
            onClick={handleSubscribeToggle}
            className={`flex justify-center items-center gap-1 px-4 cursor-pointer py-2 w-[300px] md:w-[200px] rounded-md font-semibold transition ${
              subscribed
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <FaBell />
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>

{/* Description */}
      <div className='flex justify-center items-center'>
            <p className="mt-2 text-xs text-gray-700">{user.channelDescription}</p>
        </div>

      {/* Videos Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Videos</h2>
        {videos.length === 0 ? (
          <p className="text-gray-600">There are no videos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map(video => (
              <Link
                to={`/video/${video._id}`}
                key={video._id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Category: {video.category}</p>
                  <p className="text-sm text-gray-600 mt-1">Views: {video.views}</p>
                  {/* Optionally show video preview */}
                  {/* <video src={video.videoUrl} controls className="w-full mt-2 rounded" /> */}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default UserProfilePage
