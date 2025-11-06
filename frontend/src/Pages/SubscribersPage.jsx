import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await axiosInstance.get('/subscription/my-subscribers');
      const data = res.data.data;
      setSubscribers(data.subscribers);
      setCount(data.count);
    } catch (error) {
        toast.error(error)
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
        Your Subscribers ({count})
      </h2>

      {subscribers.length === 0 ? (
        <p className="text-gray-500 text-sm">No one has subscribed to you yet.</p>
      ) : (
        <ul className="space-y-3">
          {subscribers.map((sub) => (
            <li key={sub._id} className="flex items-center gap-3">
              <img
                src={sub.avatar}
                alt={sub.username}
                className="h-10 w-10 rounded-full border"
              />
              <Link
                to={`/users/${sub.username}`}
                className="text-sm font-medium hover:text-red-600"
              >
                {sub.username}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubscribersPage;
