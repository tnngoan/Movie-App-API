import React from "react";
import MovieCard from "./MovieCard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MovieList({ movieList, genreList, loading }) {
  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <h2 style={{ color: "white" }}>Loading movies...</h2>
      </div>
    );
  }

  if (!movieList || movieList.length === 0) {
    return (
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <h2 style={{ color: "white" }}>No movies found</h2>
      </div>
    );
  }

  return (
    <div className="row m-0 p-0 d-flex justify-content-center">
      {movieList.map((item) => (
        <MovieCard
          key={item.id}
          movie={item}
          genreListMovieList={genreList}
        />
      ))}
    </div>
  );
}
