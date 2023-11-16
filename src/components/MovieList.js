import { React } from "react";
import { MovieListItem } from "./MovieListItem";

export function MovieList({ movies, handleSelectId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieListItem
          movie={movie}
          handleSelectId={handleSelectId}
          key={movie.imdbID} />
      ))}
    </ul>
  );
}
