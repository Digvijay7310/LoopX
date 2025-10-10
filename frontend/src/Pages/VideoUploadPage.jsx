import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

function VideoUploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
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
    setLoading(true);

    const form = new FormData();
    if (title) form.append("title", title);
    if (description) form.append("description", description);
    if (category) form.append("category", category);
    if (thumbnail) form.append("thumbnail", thumbnail);
    if (videoUrl) form.append("videoUrl", videoUrl); 

    try {
      const res = await axiosInstance.post("/api/video/upload", form);
      if (res.data.data) {
        toast.success("Video uploaded successfully!");
        navigate("/api/video/home");
      } else {
        toast.error("Video not uploaded.");
      }
    } catch (error) {
      console.error("Video upload error:", error);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "LoopX - Video Upload";
  }, []);

  return (
    <>
      {/* Background overlay + blur */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-lg flex justify-center items-center z-50">
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

            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <FiUpload /> Upload Your Video
            </h2>

            {/* The Form */}
            <form onSubmit={handleUpload} encType="multipart/form-data" className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-red-500 rounded-md outline-none focus:ring-1 focus:ring-red-600"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full p-2 border border-red-500 rounded-md outline-none focus:ring-1 focus:ring-red-600"
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
                <label className="block text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  className="w-full p-2 border border-red-600 rounded-md outline-none focus:ring-1 focus:ring-red-600"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-gray-700 mb-1">Thumbnail</label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="thumbnail"
                    className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Choose Thumbnail
                  </label>
                  <input
                    id="thumbnail"
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
                <label className="block text-gray-700 mb-1">Video File</label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="video"
                    className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Choose Video
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
                    <video
                      src={videoPreview}
                      controls
                      className="w-40 h-24 rounded-md border"
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 cursor-pointer text-white py-2 px-6 rounded hover:bg-red-700 disabled:bg-red-300 transition"
              >
                {loading ? "Uploading..." : "Upload"}
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
