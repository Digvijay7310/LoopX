import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/Axios'
import { toast } from 'react-toastify'

function UpdateAndDeletePage() {
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)


    try {
      const res = await axiosInstance.put(`/video/${id}/edit`, title, description)

      if (res.data.data) {
        toast.success("Video updated successfully")
        setTimeout(() =>navigate("/"), 1000)
      } else {
        toast.error("Video not updated")
        setError("Something went wrong")
      }
    } catch (error) {
      console.log("Video not edited: ", error)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/video/${id}/delete-video`)
      if (res.status === 200) {
        toast.success("Video deleted successfully")
        setTimeout(() =>navigate("/"), 1000)
      } else {
        toast.error("Video not deleted")
      }
    } catch (error) {
      console.log("Delete error:", error)
      toast.error("Error deleting video")
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update or Delete Video</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-center text-gray-500 mb-4">Processing...</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-5 py-2 rounded-md transition"
          >
            Update
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-5 py-2 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateAndDeletePage
