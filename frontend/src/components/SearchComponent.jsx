import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit} className="flex w-full">
      <label htmlFor="search"></label>
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Search videos or channels..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-3 py-2 border focus:border focus:border-red-600 rounded-l-md focus:outline-none transition-colors duration-200"
      />
      <button
        title="search"
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
      >
        <FiSearch size={20} />
      </button>
    </form>
  );
}

export default SearchComponent;
