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
        const res = await axiosInstance.get("/users/my-likes");
        if (res.data?.data) {
          setLikes(res.data.data.likes);
          setLikeCount(res.data.data.likeCount);
        } else {
          setError("No like data found.");
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
        setError("Failed to fetch likes.");
      } finally {
        setLoading(false);
      }
    };
    fetchLikes();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading likes...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Liked Videos</h2>

      {error && <p className="text-red-600">{error}</p>}

      {likes.length === 0 ? (
        <p className="text-gray-500">You haven’t liked any videos yet.</p>
      ) : (
        <>
          <p className="mb-6 text-gray-600">Total Likes: <span className="font-semibold">{likeCount}</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {likes.map((like) => (
              <Link
                key={like._id}
                to={`/video/${like.video._id}`}
                className="group bg-white border rounded-lg shadow "
              >
                <img
                  src={like.video.thumbnail}
                  alt={like.video.title}
                  className="w-full h-60 object-cover rounded-t-lg transition-transform duration-200"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {like.video.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src={like.video.owner?.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-contain"
                    />
                    <div className="text-sm text-gray-600">
                      <p>{like.video.owner?.username}</p>
                      <p className="text-xs text-gray-400">
                        {(new Date(like.video.createdAt).toDateString())}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyLikesPage;
