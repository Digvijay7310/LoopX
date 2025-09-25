import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';
import HomePageLoading from '../components/LoadingComponents/HomePageLoading';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get('/video/home');
        if (res.data.data) {
          setVideos(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching videos: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <HomePageLoading />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Home Videos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.length === 0 ? (
          <p>No Videos available</p>
        ) : (
          videos.map((video) => (
            <Link
              to={`/video/${video._id}`}
              key={video._id}
              className="cursor-pointer rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              {/* Video Preview */}
              <div className="aspect-video relative bg-black group">
                {/* Thumbnail visible by default */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute top-0 left-0 w-full h-full object-cover group-hover:hidden"
                />

                {/* Video on hover */}
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover hidden group-hover:block"
                  poster={video.thumbnail}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseOver={(e) => {
                    if (e.target.readyState >= 2) {
                      e.target.play();
                    }
                  }}
                  onMouseOut={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />
              </div>

              {/* Video Info */}
              <div className="p-3">
                <h2 className="font-semibold text-md line-clamp-2">
                  {video.title}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={video.owner?.avatar}
                    alt={video.owner?.username}
                    className="rounded-full w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-gray-600">
                      {video.owner?.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {video.views} views •{' '}
                      {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  </div>
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
