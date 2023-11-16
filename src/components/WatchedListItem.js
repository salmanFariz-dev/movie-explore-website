import { React } from "react";


export function WatchedListItem({ movie, handleDeleteWatched,handleSelectId }) {
  function handleDeleteClick(id) {
    handleDeleteWatched(id);
  }

  return (
    <li >
      <img src={movie.poster} alt={`${movie.Title} poster`} onClick={()=>handleSelectId(movie.imdbID)} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteClick(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
