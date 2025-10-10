import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';
import HomePageLoading from '../components/LoadingComponents/HomePageLoading';
import VideoShareButton from '../components/VideoShareButton';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get('/api/video/home');
        if (res.data.data) {
          setVideos(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching videos: ', error);
      } finally {
        setLoading(false);
      }
    };
    document.title = "LoopX - Home"
    fetchVideos();
  }, []);

  if (loading) return <HomePageLoading />;

  return (
    <div className="p-4 max-w-7xl mx-auto">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.length === 0 ? (
          <p>Login to see videos </p>

        ) : (
          videos.map((video) => (
            <Link
  to={`/video/${video._id}`}
  key={video._id}
  className="cursor-pointer rounded overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
>
  {/* Thumbnail with hover video */}
  <div className="aspect-video relative bg-black group">
    <img
      src={video.thumbnail}
      alt={video.title}
      className="absolute top-0 left-0 w-full h-full object-cover group-hover:hidden"
    />

    <video
      src={video.videoUrl}
      className="w-full h-full object-cover hidden group-hover:block"
      poster={video.thumbnail}
      muted
      loop
      playsInline
      preload="metadata"
      onMouseOver={(e) => {
        if (e.target.readyState >= 2) e.target.play();
      }}
      onMouseOut={(e) => {
        e.target.pause();
        e.target.currentTime = 0;
      }}
    />
  </div>

  {/* Video Info Section */}
  <div className="flex mt-3 px-2">
    {/* Avatar */}
    <img
      src={video.owner?.avatar}
      alt={video.owner?.username}
      className="rounded-full w-9 h-9 object-cover mr-3"
    />

    {/* Title + metadata */}
    <div className="flex flex-col flex-grow">
      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
        {video.title}
      </h3>
      <p className="text-xs text-gray-600 mt-1">
        {video.owner?.username}
      </p>
      <p className="text-xs text-gray-500">
        {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
      </p>
    </div>

    {/* Share Button */}
    <div className="ml-auto">
      <VideoShareButton videoId={video._id} />
    </div>
  </div>
</Link>

          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
