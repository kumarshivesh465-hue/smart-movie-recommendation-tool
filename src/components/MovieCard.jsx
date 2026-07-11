import { useState } from 'react';
import { IMAGE_BASE } from '../lib/tmdb';
import { isFavorite, toggleFavorite } from '../lib/storage';

export default function MovieCard({ movie, onClick, onFavoriteToggle }) {
  const [favorited, setFavorited] = useState(() => isFavorite(movie.id));

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const newState = toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
    setFavorited(newState);
    if (onFavoriteToggle) onFavoriteToggle(movie.id, newState);
  };

  return (
    <div
      onClick={() => onClick(movie)}
      className="relative cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-transparent hover:scale-105 transition-transform duration-200 shadow-lg"
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-base transition-colors"
      >
        {favorited ? '❤️' : '🤍'}
      </button>
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