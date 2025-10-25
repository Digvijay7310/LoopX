import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import VideoCard from '../components/VideoCard';

function MyLikesPage() {
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axiosInstance.get('/api/likes/my-likes');

        const likeData = res.data?.data?.likes || [];
        const validLikes = likeData.filter((like) => like.video !== null);

        setLikes(validLikes);
        setLikeCount(validLikes.length);
      } catch (err) {
        console.error('Error fetching likes:', err);
        setError('Failed to fetch likes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    document.title = 'LoopX - My likes';

    fetchLikes();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading your liked videos...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Liked Videos</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

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

              return <VideoCard key={like._id} video={like.video} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MyLikesPage;
