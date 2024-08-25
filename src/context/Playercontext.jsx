import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const url ='http://localhost:4000';

  const [songsData,setSongData] = useState([]);
  const [allbumsData,setAlbumsData] = useState([]);

  const [track, setTrack] = useState(songsData[0]);
  const [PlayStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const PlayWithId = async (id) => {
    if (id == null || id == undefined) return;
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };
  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };
  const seekSong = async (e) => {
    // console.log(e);
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };
  const getSongData= async()=>{
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongData(response.data.songs);
      setTrack(response.data.songs[0]);

    } catch (error) {
      
    }
  }
  const getAlbumsData = async ()=>{
    try{
      const response = await axios.get(`${url}/api/album/list`); 
    }
    catch(error)
    {

    }
  }
  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    });
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    PlayStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    PlayWithId,
    previous,
    next,
    seekSong,
  };
  // what ever here in context we can access it
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
