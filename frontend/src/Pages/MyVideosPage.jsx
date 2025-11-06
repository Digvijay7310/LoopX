import { useState, useEffect } from 'react';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import VideoCard from '../components/VideoCard';

function MyVideosPage() {
  const [videos, setVideos] = useState([]);
  const [videosCount, setVideosCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyVideos = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/video/my-videos');
        if (res.data?.data) {
          setVideos(res.data.data.videos);
          setVideosCount(res.data.data.videoCount);
        }
      } catch (err) {
        console.error('Error in fetch my Video: ', err);
        setError('Failed to fetch videos.');
      } finally {
        setLoading(false);
      }
    };
    document.title = 'LoopX - My Videos';

    fetchMyVideos();
  }, []);

  // Handle Delete video
  const handleDeleteVideo = async (videoId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/video/${videoId}/delete-video`);
      toast.success('Video deleted successfully!');

      // Remove deleted video from state to update UI immediately
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
      setVideosCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Error deleting video:', error);
      toast.error('Failed to delete video.');
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Videos fetching...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!videos.length)
    return <p className="text-center mt-10 text-gray-500">No videos uploaded yet.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <p className="mb-4 text-gray-600">
        Total Videos: <strong>{videosCount}</strong>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition relative"
          >
            <VideoCard key={video._id} video={video} onDelete={handleDeleteVideo} showDelete />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyVideosPage;
