import React, { useState, useEffect } from 'react';
import { MdDescription } from "react-icons/md"
import { toast } from 'react-toastify';
import axiosInstance from '../utils/Axios';
import {  useNavigate } from 'react-router-dom';
import { FiImage, FiSave, FiUser } from 'react-icons/fi';

function UpdateProfilePage() {
  const [fullName, setFullName] = useState('');
  const [channelDescription, setChannelDescription] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (fullName) formData.append('fullName', fullName);
    if(channelDescription) formData.append("channelDescription", channelDescription)
    if (avatarFile) formData.append('avatar', avatarFile);
    if (coverImageFile) formData.append('coverImage', coverImageFile);

    try {
      const res = await axiosInstance.patch('/users/profile/update', formData);

      if (res.data?.data) {
        navigate("/")
        toast.success('Profile updated successfully!');
        // Optionally reset files or states here
      } else {
        toast.error('Update failed.');
      }
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `LoopX - Profile Edit`
  })

  return (
    <div
      className={`max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md transition-opacity`}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <FiUser /> Edit Profile
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="fullName">
            Full Name
          </label>
          <div className="flex items-center border border-red-500 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-red-600">
            <span className=" px-3 text-gray-500">
              <FiUser />
            </span>
            <input
              id="fullName"
              type="text"
              className="flex-grow p-2 outline-none"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Channel Description */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="channelDescription">
            Description
          </label>
          <div className="flex items-center border border-red-500 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-red-600">
            <span className=" px-3 text-gray-500">
              <MdDescription  />
            </span>
            <input
              id="channelDescription"
              type="text"
              className="flex-grow p-2 outline-none border-0"
              placeholder="Enter channel Description"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Avatar Upload */}
        <div>
          <label className="block text-gray-700 mb-1">Avatar Image</label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="avatar"
              className="flex items-center gap-2 cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              <FiImage />
              Choose Avatar
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setAvatarFile(file);
                setAvatarPreview(URL.createObjectURL(file));
              }}
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
            )}
          </div>
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-gray-700 mb-1">Cover Image</label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="coverImage"
              className="flex items-center gap-2 cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              <FiImage />
              Choose Cover
            </label>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setCoverImageFile(file);
                setCoverPreview(URL.createObjectURL(file));
              }}
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-40 h-24 object-cover border border-gray-300 rounded-md"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center m-auto gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-2 rounded-md font-semibold transition"
        >
          <FiSave />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

    </div>
  );
}

export default UpdateProfilePage;
