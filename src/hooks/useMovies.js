import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchGenres,
  fetchMoviesByCategory,
  searchMovies,
  discoverByGenre,
} from "../services/api";

export default function useMovies() {
  const [movieList, setMovieList] = useState(null);
  const [fullMovieList, setFullMovieList] = useState(null);
  const [genreList, setGenreList] = useState(null);
  const [totalResult, setTotalResult] = useState(0);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("now_playing");
  const [activeGenre, setActiveGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchTimer = useRef(null);

  const loadMovies = useCallback(async (category, pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMoviesByCategory(category, pageNum);
      setMovieList(data.results);
      setFullMovieList(data.results);
      setTotalResult(data.total_results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadByGenre = useCallback(async (genreId, pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const data = await discoverByGenre(genreId, pageNum);
      setMovieList(data.results);
      setFullMovieList(data.results);
      setTotalResult(data.total_results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);
      try {
        const genres = await fetchGenres();
        setGenreList(genres);
        const data = await fetchMoviesByCategory("now_playing", 1);
        setMovieList(data.results);
        setFullMovieList(data.results);
        setTotalResult(data.total_results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const changeCategory = (category) => {
    setActiveCategory(category);
    setActiveGenre(null);
    setPage(1);
    loadMovies(category, 1);
  };

  const changeGenre = (genreId) => {
    setActiveGenre(genreId);
    setActiveCategory(null);
    setPage(1);
    loadByGenre(genreId, 1);
  };

  const changePage = (newPage) => {
    setPage(newPage);
    if (activeGenre) {
      loadByGenre(activeGenre, newPage);
    } else {
      loadMovies(activeCategory || "now_playing", newPage);
    }
  };

  const sortByRating = (ascending) => {
    const sorted = [...movieList].sort((a, b) =>
      ascending
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average
    );
    setMovieList(sorted);
  };

  const sortByPopularity = (ascending) => {
    const sorted = [...movieList].sort((a, b) =>
      ascending ? a.popularity - b.popularity : b.popularity - a.popularity
    );
    setMovieList(sorted);
  };

  const search = (query) => {
    if (searchTimer.current) clearTimeout(searchTimer.current);

    if (!query.trim()) {
      setMovieList(fullMovieList);
      return;
    }

    searchTimer.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(query, 1);
        setMovieList(data.results);
        setTotalResult(data.total_results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  return {
    movieList,
    genreList,
    totalResult,
    page,
    loading,
    error,
    changeCategory,
    changeGenre,
    changePage,
    sortByRating,
    sortByPopularity,
    search,
  };
}
