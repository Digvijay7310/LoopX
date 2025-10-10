import React, { useState, useEffect } from 'react';
import { FiUser, FiSave, FiImage } from 'react-icons/fi';
import { MdDescription } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/Axios';

function UpdateProfilePage() {
  const [fullName, setFullName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (fullName) formData.append('fullName', fullName);
    if (channelDescription) formData.append('channelDescription', channelDescription);
    if (avatarFile) formData.append('avatar', avatarFile);
    if (coverImageFile) formData.append('coverImage', coverImageFile);

    try {
      const res = await axiosInstance.patch('/users/profile/update', formData);
      if (res.data?.data) {
        toast.success('Profile updated successfully!');
        navigate('/');
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
    document.title = `LoopX - Edit Profile`;
  }, []);

  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-6 relative">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              aria-label="Close dialog"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <FiUser /> Edit Profile
            </h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <div className="flex items-center border border-red-500 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-red-600">
                  <span className="px-3 text-gray-500">
                    <FiUser />
                  </span>
                  <input
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
                <label className="block text-gray-700 mb-1">Description</label>
                <div className="flex items-center border border-red-500 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-red-600">
                  <span className="px-3 text-gray-500">
                    <MdDescription />
                  </span>
                  <input
                    type="text"
                    className="flex-grow p-2 outline-none"
                    placeholder="Enter channel description"
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
                    className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
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
                      className="w-20 h-20 rounded-full object-cover border"
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
                    className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
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
                      className="w-40 h-24 object-cover border rounded-md"
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-2 rounded-md font-semibold transition"
              >
                <FiSave />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {!isDialogOpen && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Open Profile Editor
          </button>
        </div>
      )}
    </>
  );
}

export default UpdateProfilePage;
