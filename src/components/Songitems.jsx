import React, { useContext } from "react";
import { PlayerContext } from "../context/Playercontext";

const Songitems = ({ name, image, desc, id }) => {
  const { PlayWithId } = useContext(PlayerContext);
  return (
    <div
      onClick={() => {
        if (id != null) {
          PlayWithId(id);
        }
      }}
      //i handled this on my own to check for null values before accessing the audi file , if you find a bug in future feel free to delete it - Suthesh 
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default Songitems;
