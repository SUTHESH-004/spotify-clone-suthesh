import React from "react";
import Navbar1 from "./Navbar1";
// import Albumitems from "./Albumitems";
import { albumsData } from "../assets/assets";
import Albumitems from "./Albumitems";
import { songsData } from "../assets/assets";
import Songitems from "./Songitems";
const DisplayHome = () => {
  return (
    <>
      <Navbar1 />

      <div></div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <Albumitems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
            <Songitems
              key={index}
              name={item.name}
              desc="item.desc"
              id={item.desc}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
