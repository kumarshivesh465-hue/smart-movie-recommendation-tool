const FAVORITES_KEY = 'movie_favorites';
const HISTORY_KEY = 'movie_search_history';
const MAX_HISTORY = 8;

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(id) {
  return getFavorites().some((m) => m.id === id);
}

export function toggleFavorite(movie) {
  const favs = getFavorites();
  const exists = favs.some((m) => m.id === movie.id);
  const updated = exists ? favs.filter((m) => m.id !== movie.id) : [...favs, movie];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return !exists;
}

export function getSearchHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSearchHistory(entry) {
  const history = getSearchHistory();
  const filtered = history.filter(
    (h) => !(h.mode === entry.mode && h.query.toLowerCase() === entry.query.toLowerCase())
  );
  const updated = [entry, ...filtered].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export function clearSearchHistory() {
  localStorage.removeItem(HISTORY_KEY);
  return [];
}