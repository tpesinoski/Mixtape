import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { setSingleSong } from "../redux/features/playerSlice";
import { playPause } from "../redux/features/playerSlice";
import { Link } from "react-router-dom";

const ArtistSong = ({ song,isPlaying,activeSong }) => {

const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
 const handlePlayClick = () => {
  console.log(song)
    dispatch(setSingleSong(song));
    dispatch(playPause(true))
 }
  // const activeSong = useSelector((state)=>{
  // return state.persistedReducer.player.activeSong});
  // const isPlaying = useSelector((state) => { return state.persistedReducer.player.isPlaying})


  return (
    <div>
      <div className="w-full p-4 flex justify-between hover:bg-white/5 rounded-lg">
        <div className="flex gap-3 items-center">
          <img
            src={
              song?.attributes?.artwork?.url?.slice(0, -13) + "1500x1000bb.jpg"
            }
            className="h-[45px] w-[45px]"
          />
          <div>
            <Link to={`/songs/${song?.id}`}>
             <h1 className="text-white">{song?.attributes?.name}</h1>
            </Link>
                <h3 className="text-gray-300 text-sm">
                {song?.attributes?.artistName}
                </h3>
          </div>
        </div>
        <PlayPause
          size={40}
          song={song}
          handlePause={handlePauseClick} 
          handlePlay={handlePlayClick}
          isPlaying={isPlaying}
          activeSong={activeSong} />
      </div>
    </div>
  );
};

export default ArtistSong;
