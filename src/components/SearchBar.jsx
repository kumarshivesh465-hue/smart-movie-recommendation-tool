import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Search by movie title...' }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:border-teal-500"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors"
      >
        Search
      </button>
    </form>
  );
}