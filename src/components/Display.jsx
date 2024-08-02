import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { albumsData } from "../assets/assets";
//to use routers npm install react-router-dom

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  // console.log(location);
  const isAlbum = location.pathname.includes("album");
  console.log(isAlbum);
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  // console.log(albumId);
  const bgColor = albumsData[Number(albumId)].bgColor;
  console.log(bgColor);

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
      // console.log("suthesh");
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });
  // console.log(bgColor);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
