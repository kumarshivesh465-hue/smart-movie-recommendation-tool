import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MoodSearch from './components/MoodSearch';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import { searchMovies, searchPeople, getMoviesByPerson } from './lib/tmdb';
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

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setMoodInterpretation(null);
    try {
      if (mode === 'title') {
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
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodResults = (results, interpretation) => {
    setHasSearched(true);
    setMovies(results);
    setMoodInterpretation(interpretation);
    setError(results.length === 0 && !interpretation ? 'Something went wrong. Please try again.' : null);
  };

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
        <button
          onClick={() => setMode('title')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'title' ? 'bg-teal-600 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Search by Title
        </button>
        <button
          onClick={() => setMode('actor')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'actor' ? 'bg-teal-600 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Search by Actor
        </button>
        <button
          onClick={() => setMode('mood')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'mood' ? 'bg-teal-600 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Mood Search
        </button>
      </div>

      {mode === 'mood' ? (
        <MoodSearch onResults={handleMoodResults} />
      ) : (
        <SearchBar
          onSearch={handleSearch}
          placeholder={mode === 'title' ? 'Search by movie title...' : 'Search by actor/actress name...'}
        />
      )}

      <div className="mt-10 max-w-6xl mx-auto">
        {loading && <p className="text-center text-neutral-500 dark:text-neutral-400">Loading movies...</p>}
        {error && <p className="text-center text-red-500 dark:text-red-400">{error}</p>}
        {!loading && hasSearched && movies.length === 0 && !error && (
          <p className="text-center text-neutral-500 dark:text-neutral-400">No movies found. Try another search.</p>
        )}

        {moodInterpretation && (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-500 mb-6">
            Understood as: {moodInterpretation.genres?.join(', ')} · {moodInterpretation.keywords?.join(', ')}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovieId(movie.id)} />
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