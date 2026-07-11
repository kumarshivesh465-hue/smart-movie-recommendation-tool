const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`TMDb request failed: ${response.status}`);
  }
  return response.json();
}

export function searchMovies(query, page = 1) {
  return tmdbFetch('/search/movie', { query, page, include_adult: false });
}

export function searchPeople(query, page = 1) {
  return tmdbFetch('/search/person', { query, page });
}

export function getMoviesByPerson(personId) {
  return tmdbFetch(`/person/${personId}/movie_credits`);
}

export function getMovieDetails(movieId) {
  return tmdbFetch(`/movie/${movieId}`, { append_to_response: 'credits,similar' });
}

export function discoverMovies(params = {}) {
  return tmdbFetch('/discover/movie', params);
}

export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';