import { useState, useEffect } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';

function MyVideosPage() {
  const [videos, setVideos] = useState([]);
  const [videosCount, setVideosCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyVideos = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/video/my-videos");
        if (res.data?.data) {
          setVideos(res.data.data.videos);
          setVideosCount(res.data.data.videoCount); // Fix: It’s `videoCount`, not `videosCount`
        }
      } catch (err) {
        console.error("Error in fetch my Video: ", err);
        setError("Failed to fetch videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Videos fetching...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!videos.length) return <p className="text-center mt-10 text-gray-500">No videos uploaded yet.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Videos</h2>
      <p className="mb-4 text-gray-600">Total Videos: <strong>{videosCount}</strong></p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{video.title}</h3>
              <p className="text-sm text-gray-500">{video.views} views</p>

              <div className="flex items-center gap-2 mt-2">
                <img
                  src={video.owner?.avatar || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-700">@{video.owner?.username}</span>
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(video.createdAt).toDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyVideosPage;
