import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/Axios';
import { useSearchParams, Link } from 'react-router-dom';
import VideoShareButton from '../components/VideoShareButton';

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
        const res = await axiosInstance.get(`/api/video/search?q=${encodeURIComponent(query)}`);
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
            <Link
              to={`/video/${video._id}`}
              key={video._id}
              className="cursor-pointer rounded overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
             >
  {/* Thumbnail with hover video */}
  <div className="aspect-video relative bg-black group">
    <img
      src={video.thumbnail}
      alt={video.title}
      className="absolute top-0 left-0 w-full h-full object-cover group-hover:hidden"
    />

    <video
      src={video.videoUrl}
      className="w-full h-full object-contain hidden group-hover:block"
      poster={video.thumbnail}
      muted
      loop
      playsInline
      preload="metadata"
      onMouseOver={(e) => {
        if (e.target.readyState >= 2) e.target.play();
      }}
      onMouseOut={(e) => {
        e.target.pause();
        e.target.currentTime = 0;
      }}
    />
  </div>

  {/* Video Info Section */}
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
    </div>

    {/* Share Button */}
    <div className="ml-auto">
      <VideoShareButton videoId={video._id} />
    </div>
  </div>
         </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
