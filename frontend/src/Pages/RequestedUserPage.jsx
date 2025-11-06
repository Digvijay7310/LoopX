import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { useNavigate, Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import HomePageVideoCard from '../components/HomePageVideoCard'; // 👈 use your existing video card

function RequestedUserPage() {
  const [user, setUser] = useState(null);
  const [myVideos, setMyVideos] = useState([]); // 👈 for user videos
  const [loading, setLoading] = useState(true);
  const [videosLoading, setVideosLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 🔹 Fetch logged-in user info
  useEffect(() => {
    const fetchMySelf = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get('/users/me');
        if (res.data && res.data.data) {
          setUser(res.data.data);
        } else {
          setError('User data not found');
        }
      } catch (error) {
        console.log('Error fetch me, ', error.response || error.message || error);
        setError('You are not logged in');
      } finally {
        setLoading(false);
      }
    };

    document.title = `LoopX - My Profile`;
    fetchMySelf();
  }, []);

  // 🔹 Fetch user's uploaded videos
  useEffect(() => {
    if (!user?._id) return;

    const fetchMyVideos = async () => {
      setVideosLoading(true);
      try {
        const res = await axiosInstance.get('/video/my-videos'); // ✅ adjust if your endpoint differs
        setMyVideos(res.data?.data?.videos || []);
      } catch (error) {
        console.log('Error fetching my videos:', error.response || error.message || error);
      } finally {
        setVideosLoading(false);
      }
    };

    fetchMyVideos();
  }, [user]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!user) return <p className="text-center mt-10 text-gray-500">No user found</p>;

  return (
    <div className="flex justify-center items-center flex-col mx-auto max-w-5xl p-1">
      {/* Cover Image */}
      <div
        className="h-48 w-full bg-gray-300 rounded-2xl"
        style={{
          backgroundImage: `url(${user?.coverImage || 'https://via.placeholder.com/900x200'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="px-6 py-4 relative w-full">
        {/* Avatar */}
        <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden w-32 h-32 bg-gray-200 shadow-md">
          <img
            src={user?.avatar || 'https://via.placeholder.com/150'}
            alt={`${user.fullName || 'User'} avatar`}
            className="object-cover w-full h-full"
          />
        </div>

        {/* User Info */}
        <div className="mt-10 flex justify-between flex-col">
          <h1 className="text-3xl font-semibold">{user.fullName || 'No Name'}</h1>
          <p className="text-gray-600">@{user.username || 'username'}</p>
          <p className="text-gray-500">Email: {user.email}</p>
          <p className="text-gray-500">User Blocked: {user.isBlocked ? "Yes": "No"}</p>
          <p className="text-gray-700">
            Description: <span className='text-xs font-medium'>
              {user.channelDescription || 'No description provided.'}
            </span>
          </p>

          <button
            type="button"
            className="flex justify-center items-center gap-2 cursor-pointer mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
            onClick={() => navigate('/users/profile/update')}
            title="Edit Profile"
          >
            <FiEdit /> <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Top Buttons: My Likes, My Comments, My Videos */}
      <div className="flex justify-center items-center gap-6 mb-6 mt-4">
        <button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer font-semibold text-sm px-4 py-2 rounded-xl shadow-lg">
          <Link to="/likes/my-likes">My Likes</Link>
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer font-semibold text-sm px-4 py-2 rounded-xl shadow-lg">
          <Link to="/comments/my-comments">My Comments</Link>
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer font-semibold text-sm px-4 py-2 rounded-xl shadow-lg">
          <Link to="/video/my-videos">My Videos</Link>
        </button>
      </div>

      {/* My Videos Section */}
      <div className="w-full mt-2">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">My Uploaded Videos</h2>

        {videosLoading ? (
          <p className="text-gray-500 text-center">Loading your videos...</p>
        ) : myVideos.length === 0 ? (
          <p className="text-gray-500 text-center">You haven’t uploaded any videos yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myVideos.slice(0, 10).map((video) => (
              <HomePageVideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestedUserPage;
