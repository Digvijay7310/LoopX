import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/Axios';

function SearchUserComponent() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Call API jab query length >= 3 ho
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length >= 3) {
        searchUsers(query);
      } else {
        setUsers([]);
      }
    }, 300); // Thoda debounce time to avoid too many requests

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const searchUsers = async (searchTerm) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/admin/search?q=${searchTerm}`);
      setUsers(res.data.data || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 border rounded px-2"
      >
        <label htmlFor="search-user"></label>
        <input
          type="search-user"
          id="search-user"
          name="search-user"
          placeholder="Search by username or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 outline-none"
        />
        <button type="submit">
          <FiSearch size={20} />
        </button>
      </form>

      {loading && <p className="mt-2 text-sm">Searching...</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {/* Results */}
      {users.length > 0 && (
        <ul className="mt-4 border rounded divide-y">
          {users.map((user) => (
            <li key={user._id} className=" hover:bg-gray-100">
              <Link to={`/admin/${user.username}`} className="flex items-center gap-3">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full" />
                ) : (
                  <div className="h-8 w-8 bg-gray-300 rounded-full" />
                )}
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchUserComponent;
