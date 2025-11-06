import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import Loading from '../components/Loading';

function SubscribedChannels() {
  const [channels, setChannels] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await axiosInstance.get('/subscription/my-subscriptions');
      const data = res.data.data;
      setChannels(data.channels);
      setCount(data.count);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-3">
        Subscribed Channels ({count})
      </h2>

      {channels.length === 0 ? (
        <p className="text-gray-500 text-sm">You haven't subscribed to any channels yet.</p>
      ) : (
        <ul className="space-y-3">
          {channels.map((channel) => (
            <li key={channel._id} className="flex items-center gap-3 bg-gray-100 p-2 rounded">
                <Link
                to={`/users/${channel.username}`}
                className="text-sm font-medium flex items-center gap-2 hover:text-red-600"
              >
              <img
                src={channel.avatar}
                alt={channel.username}
                className="h-10 w-10 rounded-full border"
              />
              <p> {channel.username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubscribedChannels;
