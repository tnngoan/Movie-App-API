const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_APIKEY;

export async function fetchGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  return data.genres;
}

export async function fetchMoviesByCategory(category, page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to search movies");
  return res.json();
}

export async function discoverByGenre(genreId, page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch movies by genre");
  return res.json();
}

export async function fetchMovieTrailer(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch trailer");
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].key;
  }
  return null;
}
