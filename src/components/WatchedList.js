import { React } from "react";
import { WatchedListItem } from "./WatchedListItem";

export function WatchedList({ watched, handleDeleteWatched,handleSelectId }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedListItem
          handleSelectId={handleSelectId}
          key={movie.imdbID}
          movie={movie}
          handleDeleteWatched={handleDeleteWatched} />
      ))}
    </ul>
  );
}
