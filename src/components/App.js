import { React, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NavBar } from "./NavBar";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { NumResult } from "./NumResult";
import { Main } from "./Main";
import { ListBox } from "./ListBox";
import { MovieList } from "./MovieList";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";
import { MovieDetails } from "./MovieDetails";
import { Loader } from "./Loader";
import { ErrorMsg } from "./ErrorMsg";


export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "550c4c84";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "watched");

  //handler functions
  function handleSelectId(id) {
    setSelectedId((sId) => (sId === id ? null : id));
  }
  function handleClose() {
    setSelectedId(null);
  }
  function handleAddWatched(newWatched) {
    setWatched((watched) => [...watched, newWatched]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  //-----------------------

  //effect for fetching movies of search query
  const { movies, loader, err } = useMovies(query);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar
          query={query}
          setQuery={setQuery}
          handleClose={handleClose}
        />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {/* {loader ? <Loader /> : err ? <ErrorMsg msg={err.message} /> : <MovieList movies={movies} /> } */}
          {loader && <Loader />}
          {err && <ErrorMsg msg={err} />}
          {!loader && !err && (
            <MovieList movies={movies} handleSelectId={handleSelectId} />
          )}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleClose={handleClose}
              handleAddWatched={handleAddWatched}
              watched={watched}
              key={Date.now()}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                handleSelectId={handleSelectId}
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}


