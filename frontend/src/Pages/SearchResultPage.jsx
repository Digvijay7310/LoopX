import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { useSearchParams, Link } from 'react-router-dom';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return; // No query, no fetch

    setLoading(true);
    setError(null);

    const fetchResults = async () => {
      try {
        const res = await axiosInstance.get(`/video/search?q=${encodeURIComponent(query)}`);
        if (res.data && res.data.data && res.data.data.results) {
          setResults(res.data.data.results);
        } else {
          setResults([]);
          setError('No results found.');
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };
    document.title = `LoopX - Search Result for ${query}`

    fetchResults();
  }, [query]);

  if (!query) return <p className="p-6 text-center">Please enter a search query.</p>;
  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p className="text-gray-600">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map(video => (
            <Link key={video._id} to={`/video/${video._id}`} className="border rounded shadow hover:shadow-md">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded-t" />
              <div className="p-3">
                <h3 className="font-medium text-gray-800">{video.title}</h3>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <img src={video.owner.avatar} alt="" className="w-6 h-6 rounded-full" />
                  <span>{video.owner.username}</span>
                </div>
                <p>{video.views} views</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
