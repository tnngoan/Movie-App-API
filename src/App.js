import React from "react";
import useMovies from "./hooks/useMovies";
import Sidebar from "./components/Sidebar";
import AppNavbar from "./components/AppNavbar";
import MovieList from "./components/MovieList";
import MoviePagination from "./components/MoviePagination";
import LoadingScreen from "./components/LoadingScreen";
import ErrorBanner from "./components/ErrorBanner";
import "./App.css";

export default function App() {
  const {
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
  } = useMovies();

  if (!genreList && loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="d-flex">
      <Sidebar
        genreList={genreList}
        onCategoryChange={changeCategory}
        onGenreSelect={changeGenre}
        onSortRating={sortByRating}
        onSortPopularity={sortByPopularity}
      />
      <div>
        <AppNavbar onSearch={search} />
        <ErrorBanner message={error} />
        <div className="listRow ml-5 mr-0 mt-5">
          <MovieList
            movieList={movieList}
            genreList={genreList}
            loading={loading}
          />
        </div>
        <MoviePagination
          page={page}
          totalResult={totalResult}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
