import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/Axios'
import {  useNavigate, Link } from 'react-router-dom'

function RequestedUserPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMySelf = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axiosInstance.get("/users/me")
        if (res.data.data) {
          setUser(res.data.data)
        }
      } catch (error) {
        console.log("Error fetch me, ", error)
        setError("You are not logged in")
      } finally {
        setLoading(false)
      }
    }
    fetchMySelf()
  }, [])

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Cover Image */}
      <div
        className="h-48 w-full bg-gray-300"
        style={{
          backgroundImage: `url(${user.coverImage || "https://via.placeholder.com/900x200"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="px-6 py-4 relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden w-32 h-32 bg-gray-200">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt={`${user.fullName || "User"} avatar`}
            className="object-cover w-full h-full"
          />
        </div>

        {/* User info */}
        <div className="ml-40">
          <h1 className="text-3xl font-semibold">{user.fullName || "No Name"}</h1>
          <p className="text-gray-600">@{user.username || "username"}</p>
          <p className="text-gray-500 mt-1">{user.email}</p>

          <button
            type="button"
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
            onClick={() => navigate("/users/profile/update")}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className='flex justify-center items-center gap-2 m-auto'>
        <button className='bg-red-600 text-white px-3 py-1 rounded-4xl shadow-lg'><Link to="/likes/my-likes">My Likes</Link></button>
      <button className='bg-red-600 text-white px-3 py-1 rounded-4xl shadow-lg'><Link to="/comments/my-comments">My Comments</Link></button>
      </div>
    </div>
  )
}

export default RequestedUserPage
