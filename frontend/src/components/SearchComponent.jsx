import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/video/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="Search videos or channels..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchComponent
