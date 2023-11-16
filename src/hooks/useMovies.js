import { useState,useEffect } from "react";

const KEY = "550c4c84";

export function useMovies(query) {
  const [loader, setLoader] = useState(false);
  const [err, setErr] = useState("");
  const [movies, setMovies] = useState([]);

  console.log("use movies working")

  useEffect(() => {
    const controller = new AbortController();
    async function fecthMovies() {
      setErr("");
      try {
        setLoader(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query},`,
          { signal: controller.signal }
        );
        const data = await res.json();
        console.log(data.Response);
        if (data.Response === "False") throw new Error("movie not found");
        setMovies(data.Search);
        setLoader(false);
        setErr("");
      } catch (e) {
        if (e.name === "AbortError") {
          setErr("");
        }
        console.log(e.name)
        setErr(e.message);
      } finally {
        setLoader(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setErr("");
      return;
    }

    fecthMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return {movies,loader,err}
}
