import { React, useRef } from "react";
import { useKey } from "../hooks/useKey";

export function SearchBar({ query, setQuery, handleClose }) {
  const searchInp = useRef(null);

  useKey("enter", function () {
    searchInp.current.focus();
    setQuery("");
    handleClose();
  });

  // useEffect(()=>{
  //   function callBack(e){
  //     if(e.code === "Enter"){
  //       searchInp.current.focus()
  //       setQuery("")
  //       handleClose()
  //     }
  //   }
  //   document.addEventListener("keydown",callBack)
  // },[setQuery,handleClose])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInp} />
  );
}
