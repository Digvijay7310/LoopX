import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiImage, FiUpload, FiVideo } from 'react-icons/fi';
import UploadLoading from '../components/LoadingComponents/UploadLoading';

const allowedCategories = [
  "Education",
  "Entertainment",
  "Gaming",
  "Music",
  "News",
  "Sports",
  "Technology",
  "Travel",
  "Comedy",
  "Blogs",
  "WildLife",
  "Others"
]; 

function VideoUploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal state: dialog open by default
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if(!allowedCategories.includes(category)){
      toast.error('Please select a valid category');
      return;
    }

    if(!title || !description || !thumbnail || !videoUrl){
      toast.error("Please fill all the fields and select files.")
      return;
    }

    setLoading(true);
    const form = new FormData();
    if (title) form.append('title', title);
    if (description) form.append('description', description);
    if (category) form.append('category', category);
    if (thumbnail) form.append('thumbnail', thumbnail);
    if (videoUrl) form.append('videoUrl', videoUrl);

    try {
      const res = await axiosInstance.post('/video/upload', form);
      if (res.data.data) {
        toast.success('Video uploaded successfully!');
        navigate('/video/home');
      } else {
        toast.error('Video not uploaded.');
      }
    } catch (error) {
      console.error('Video upload error:', error);
      toast.error('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'LoopX - Video Upload';
  }, []);

  return (
    <>
      {/* Background overlay + blur */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-opacity-80 backdrop-blur-lg flex justify-center items-center z-50">
          {/* Dialog box */}
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              aria-label="Close dialog"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              <FiUpload /> Upload Your Video
            </h2>

            {/* The Form */}
            <form onSubmit={handleUpload} encType="multipart/form-data" className={`space-y-1 md:space-y-2 ${loading ? 'hidden' : 'block'}`}>
            {loading && (
              <div className='flex justify-center items-center'>
                <UploadLoading />
              </div>
            )}
              {/* Title */}
              <div className='border-b border-black focus-within:border-b-red-600'>
                <label htmlFor="title" className="block text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-2 border-0 rounded-md outline-none"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 border border-red-600 rounded outline-none "
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  maxLength={3000}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-gray-700 mb-1">
                  Category
                </label>
                <select
                    id="category"
                    name="category"
                    className="w-full p-2 border border-red-600 rounded-md outline-none focus:ring-1 focus:ring-red-600"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="" className='text-center' disabled>
                      -- Select a category --
                    </option>
                    {allowedCategories.map((cat) => (
                      <option key={cat} value={cat} >
                        {cat}
                      </option>
                    ))}
                  </select>

              </div>

              {/* Thumbnail Upload */}
              <div>
                <label htmlFor="thumbnail" className="hidden text-gray-700 mb-1">
                  Thumbnail
                </label>
                <div className="flex items-center gap-4">
                  
                  <label
                    htmlFor="thumbnail"
                    className="cursor-pointer flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    <FiImage />
                     Thumbnail
                  </label>
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setThumbnail(file);
                      setThumbnailPreview(URL.createObjectURL(file));
                    }}
                  />
                  {thumbnailPreview && (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="w-24 h-16 object-cover border rounded"
                    />
                  )}
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label htmlFor="video" className="hidden text-gray-700 mb-1">
                  Video File
                </label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="video"
                    className="cursor-pointer flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    <FiVideo />
                    Video
                  </label>
                  <input
                    id="video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setVideoUrl(file);
                      setVideoPreview(URL.createObjectURL(file));
                    }}
                  />
                  {videoPreview && (
                    <video src={videoPreview} controls className="w-40 h-24 rounded-md border" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 cursor-pointer text-white py-2 px-6 rounded hover:bg-red-700 disabled:bg-red-300 transition"
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Agar dialog band hai to simple ek button dikhaye jisse wapas open ho sake */}
      {!isDialogOpen && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Start upload your video
          </button>
        </div>
      )}
    </>
  );
}

export default VideoUploadPage;
