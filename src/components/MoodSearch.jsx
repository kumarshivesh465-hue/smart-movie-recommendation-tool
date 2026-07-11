import { useState } from 'react';

export default function MoodSearch({ onResults }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/mood-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      const data = await response.json();
      onResults(data.movies || [], data.interpretation);
    } catch (err) {
      onResults([], null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Try: "I want a feel-good sci-fi movie"'
        className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:border-teal-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-medium transition-colors"
      >
        {loading ? '...' : 'Find'}
      </button>
    </form>
  );
}