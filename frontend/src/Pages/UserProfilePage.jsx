import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import VideoCard from '../components/VideoCard';
import SubscribeButton from '../components/SubscribeButton';

function UserProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showDescription, setShowDescription] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the user profile (public)
  useEffect(() => {
    const fetchUserAndVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/api/users/${username}`);
        if (res.data.data.user) {
          setUser(res.data.data.user);
          setVideos(res.data.data.videos || []);
          setSubscribed(Boolean(res.data.data.user.isSubscribed));
        } else {
          setError('User data not found');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.response?.data?.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    if (username) {
      fetchUserAndVideos();
    }
  }, [username]);



 

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading user details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!user) return <p className="text-center mt-10 text-gray-700">User not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-1 ">
      {/* Cover Image */}
      <div className="w-full h-48 md:h-54 rounded-lg overflow-hidden mb-2 bg-gray-200">
        <img
          src={user.coverImage || 'https://via.placeholder.com/900x300'}
          alt={`${user.username}'s cover`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info Section */}
      <div className="flex md:flex-row items-center md:items-start gap-2 relative">
        {/* Avatar */}
        <div className="w-32 h-32  rounded-full overflow-hidden border border-red-600 flex-shrink-0 bg-gray-100">
          <img
            src={user.avatar || 'https://via.placeholder.com/150'}
            alt={`${user.username}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
          <p className="text-red-600 text-lg font-semibold">@{user.username}</p>
          <p className="mt-0.5 text-xs md:mt-1 md:text-sm text-gray-500 hover:text-green-600 transition-colors duration-150">Email: {user.email}</p>
          <p className="mt-0.5 text-xs md:mt-1 md:text-sm text-gray-500">User blocked: {user.isBlocked ? "Yes": "No"}</p>

          {/* Channel Description */}
          {user.channelDescription && (
            <div className="mb-4 text-xs text-gray-700 font-medium">
              <p className="inline">
                {showDescription
                  ? user.channelDescription
                  : user.channelDescription.split(' ').slice(0, 5).join(' ') + '...'}
              </p>

              <button
                onClick={() => setShowDescription((prev) => !prev)}
                className="text-blue-600 ml-2 hover:underline"
              >
                {showDescription ? 'Show less' : 'Show more'}
              </button>
            </div>
          )}

          {user.myLink && (
            <a
              href={user.myLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              {user.myLink}
            </a>
          )}
        </div>
        
      </div>
      <div className="flex justify-center items-center">
        <SubscribeButton channelUsername={user.username}
        initialSubscribed={subscribed}
        />
      </div>

      {/* Videos Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Videos</h2>
        {videos.length === 0 ? (
          <p className="text-gray-600 italic">This user hasn’t uploaded any videos yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default UserProfilePage;
