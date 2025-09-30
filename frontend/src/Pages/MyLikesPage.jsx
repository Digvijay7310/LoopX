import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link } from 'react-router-dom';

function MyLikesPage() {
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axiosInstance.get("/likes/my-likes");

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
                  className="group bg-white border rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-60 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <img
                        src={video.owner?.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="text-sm text-gray-600">
                        <p>{video.owner?.username || "Unknown"}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(video.createdAt).toDateString()}
                        </p>
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
