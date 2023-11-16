import { React, useEffect, useState } from "react";
import RatingStar from "../RatingStar";
import { useKey } from "../hooks/useKey";
import { KEY } from "./App";
import { Loader } from "./Loader";

export function MovieDetails({ selectedId, handleClose, handleAddWatched, watched }) {
  const [details, setDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.find((movie) => movie.imdbID === selectedId);

  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre,
  } = details;

  function handleAddMovie() {
    const newWatched = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    handleAddWatched(newWatched);
    handleClose();
  }

  //effect for movie details fetching
  useEffect(() => {
    async function fetchDetails() {
      setLoader(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setDetails(data);
      setLoader(false);
    }
    fetchDetails();
  }, [selectedId]);

  //effect for adding title
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  //effect for handling the esc key click
  useKey("escape", handleClose);

  return (
    <div className="details">
      {loader ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
              <p>{details?.Ratings[0]?.Value}</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <RatingStar
                    maxRating={10}
                    size={24}
                    color="yellow"
                    onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      Add to watched
                    </button>
                  )}
                </>
              ) : (
                <>
                  <p>
                    You rated this movie &nbsp;{isWatched.userRating}
                    <span> ⭐️</span>
                  </p>
                  <button className="btn-add" onClick={handleClose}>
                    Go to watched
                  </button>
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
