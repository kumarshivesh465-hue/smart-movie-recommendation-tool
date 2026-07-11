import { useEffect, useState } from 'react';
import { getMovieDetails, IMAGE_BASE } from '../lib/tmdb';

export default function MovieDetail({ movieId, onClose, onSelectMovie }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setMovie(null);
    getMovieDetails(movieId)
      .then((data) => {
        if (!cancelled) setMovie(data);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load movie details.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-700 dark:text-white bg-neutral-200 dark:bg-neutral-800 hover:opacity-80 rounded-full w-8 h-8 flex items-center justify-center z-10"
        >
          ✕
        </button>

        {loading && <p className="p-10 text-center text-neutral-500 dark:text-neutral-400">Loading details...</p>}
        {error && <p className="p-10 text-center text-red-500 dark:text-red-400">{error}</p>}

        {movie && !loading && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE}${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Poster'
                }
                alt={movie.title}
                className="w-full md:w-64 rounded-lg object-cover self-start"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{movie.title}</h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                  {movie.release_date?.slice(0, 4) || 'N/A'} · ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 text-xs rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">{movie.overview}</p>

                {movie.credits?.cast?.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Cast</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {movie.credits.cast.slice(0, 6).map((c) => c.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {movie.similar?.results?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Similar Movies</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {movie.similar.results.slice(0, 6).map((sim) => (
                    <div
                      key={sim.id}
                      onClick={() => onSelectMovie(sim.id)}
                      className="cursor-pointer rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 hover:scale-105 transition-transform"
                    >
                      <img
                        src={
                          sim.poster_path
                            ? `${IMAGE_BASE}${sim.poster_path}`
                            : 'https://via.placeholder.com/300x450?text=No+Poster'
                        }
                        alt={sim.title}
                        className="w-full aspect-[2/3] object-cover"
                      />
                      <p className="text-xs text-neutral-900 dark:text-white p-1.5 truncate">{sim.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}