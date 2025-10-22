import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';
import VideoShareButton from '../components/VideoShareButton';

function MyLikesPage() {
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axiosInstance.get("/api/likes/my-likes");

        const likeData = res.data?.data?.likes || [];
        const validLikes = likeData.filter(like => like.video !== null);

        setLikes(validLikes);
        setLikeCount(validLikes.length);
      } catch (err) {
        console.error("Error fetching likes:", err);
        setError("Failed to fetch likes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    document.title = "LoopX - My likes"

    fetchLikes();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading your liked videos...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Liked Videos</h2>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {likes.length === 0 ? (
        <p className="text-gray-500">You haven’t liked any videos yet.</p>
      ) : (
        <>
          <p className="mb-6 text-gray-600">
            Total Likes: <span className="font-semibold">{likeCount}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {likes.map((like) => {
              const video = like.video;
              if (!video) return null;

              return (
                <Link
                  key={like._id}
                  to={`/video/${video._id}`}
                  className='cursor-pointer rounded overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200'
                >
                  {/* Thumbnail with hover video */}
                  <div className="aspect-video relative bg-black group">
                    <img src={video.thumbnail} alt={video.title}
                    className='w-full h-full object-cover group-hover:hidden' />
                    <video src={video.videoUrl}
                    className='w-full h-full object-cover hidden group-hover:block'
                    poster={video.thumbnail}
                    muted
                    loop
                    playsInline
                    preload='metadata'
                    onMouseOver={(e) => {
                      if(e.target.readyState >= 2) e.target.play();
                    }}
                    onMouseOut={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                    />
                  </div>
                  
                  {/* Video info section */}
                  <div className="flex mt-3 px-2">
    {/* Avatar */}
    <img
      src={video.owner?.avatar}
      alt={video.owner?.username}
      className="rounded-full w-9 h-9 object-cover mr-3"
    />

    {/* Title + metadata */}
    <div className="flex flex-col flex-grow">
      <h3 className="font-semibold text-sm text-gray  -900 line-clamp-2">
        {video.title}
      </h3>
      <p className="text-xs text-gray-600 mt-1">
        {video.owner?.username}
      </p>
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">
        {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
      </p>
      <VideoShareButton />
      </div>
      
    </div>

  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MyLikesPage;
