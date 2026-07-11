import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MoodSearch from './components/MoodSearch';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import SearchHistory from './components/SearchHistory';
import { searchMovies, searchPeople, getMoviesByPerson } from './lib/tmdb';
import { getFavorites, getSearchHistory, addSearchHistory, clearSearchHistory } from './lib/storage';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [mode, setMode] = useState('title');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [moodInterpretation, setMoodInterpretation] = useState(null);
  const [history, setHistory] = useState(() => getSearchHistory());

  useEffect(() => {
    if (mode === 'favorites') {
      setMovies(getFavorites());
      setHasSearched(true);
      setError(null);
      setMoodInterpretation(null);
    }
  }, [mode]);

  const handleSearch = async (query, overrideMode) => {
    const activeMode = overrideMode || mode;
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setMoodInterpretation(null);
    try {
      if (activeMode === 'title') {
        const data = await searchMovies(query);
        setMovies(data.results || []);
      } else {
        const peopleData = await searchPeople(query);
        const person = peopleData.results?.[0];
        if (!person) {
          setMovies([]);
        } else {
          const creditsData = await getMoviesByPerson(person.id);
          const sorted = (creditsData.cast || [])
            .filter((m) => m.poster_path)
            .sort((a, b) => b.popularity - a.popularity);
          setMovies(sorted);
        }
      }
      setHistory(addSearchHistory({ mode: activeMode, query }));
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const runMoodSearch = async (prompt) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setMoodInterpretation(null);
    try {
      const response = await fetch('/api/mood-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setMovies(data.movies || []);
      setMoodInterpretation(data.interpretation || null);
      if (!data.movies?.length && !data.interpretation) {
        setError('Something went wrong. Please try again.');
      }
      setHistory(addSearchHistory({ mode: 'mood', query: prompt }));
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (entry) => {
    setMode(entry.mode);
    if (entry.mode === 'mood') {
      runMoodSearch(entry.query);
    } else {
      handleSearch(entry.query, entry.mode);
    }
  };

  const handleClearHistory = () => setHistory(clearSearchHistory());

  const handleFavoriteToggle = (movieId, isFav) => {
    if (mode === 'favorites' && !isFav) {
      setMovies((prev) => prev.filter((m) => m.id !== movieId));
    }
  };

  const modeButtons = [
    { key: 'title', label: 'Search by Title' },
    { key: 'actor', label: 'Search by Actor' },
    { key: 'mood', label: 'Mood Search' },
    { key: 'favorites', label: '❤️ Favorites' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white px-4 py-10 transition-colors">
      <div className="max-w-6xl mx-auto flex justify-end mb-2">
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-lg text-sm bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:opacity-80 transition-opacity"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        🎬 Smart Movie Recommendation Tool
      </h1>

      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {modeButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setMode(btn.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === btn.key
                ? 'bg-teal-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {mode === 'mood' && <MoodSearch onSubmit={runMoodSearch} loading={loading} />}
      {(mode === 'title' || mode === 'actor') && (
        <SearchBar
          onSearch={(q) => handleSearch(q)}
          placeholder={mode === 'title' ? 'Search by movie title...' : 'Search by actor/actress name...'}
        />
      )}

      {mode !== 'favorites' && (
        <SearchHistory history={history} onSelect={handleHistorySelect} onClear={handleClearHistory} />
      )}

      <div className="mt-10 max-w-6xl mx-auto">
        {loading && <p className="text-center text-neutral-500 dark:text-neutral-400">Loading movies...</p>}
        {error && <p className="text-center text-red-500 dark:text-red-400">{error}</p>}
        {!loading && hasSearched && movies.length === 0 && !error && (
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            {mode === 'favorites' ? 'No favorites yet — tap the heart on any movie to save it.' : 'No movies found. Try another search.'}
          </p>
        )}

        {moodInterpretation && (
          <p className="text-center text-sm text-neutral-500 mb-6">
            Understood as: {moodInterpretation.genres?.join(', ')} · {moodInterpretation.keywords?.join(', ')}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovieId(movie.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      </div>

      {selectedMovieId && (
        <MovieDetail
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          onSelectMovie={(id) => setSelectedMovieId(id)}
        />
      )}
    </div>
  );
}

export default App;