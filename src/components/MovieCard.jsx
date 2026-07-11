import { IMAGE_BASE } from '../lib/tmdb';

export default function MovieCard({ movie, onClick }) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div
      onClick={() => onClick(movie)}
      className="cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-transparent hover:scale-105 transition-transform duration-200 shadow-lg"
    >
      <img src={posterUrl} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
      <div className="p-3">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{movie.release_date?.slice(0, 4) || 'N/A'}</span>
          <span className="flex items-center gap-1">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}