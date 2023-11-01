import { Skeleton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import PlayPause from './PlayPause'
import { setActiveSong, playPause} from "../redux/features/playerSlice";
import { useSelector, useDispatch } from "react-redux";
import {setSingleSong} from "../redux/features/playerSlice"

const SearchSong = ({song}) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
 const handlePlayClick = () => {
    dispatch(setSingleSong(song.track));
    dispatch(playPause(true));
 }
 const activeSong = useSelector((state)=>{
  return state.persistedReducer.player.activeSong});
  const isPlaying = useSelector((state) => { return state.persistedReducer.player.isPlaying})


  return (
    <>
        <div className='w-full  p-4 flex justify-between hover:bg-white/5 rounded-lg'>
          <div className="flex gap-3 items-center">
              <img src={song?.track?.images?.coverart} className="h-[45px] w-[45px]" />
              <div>
                <Link to={`/songs/${song.track.key}`}>
                  <h1 className='text-white'>{song?.track?.title}</h1>
                </Link>
                <h3 className='text-gray-300 text-sm'>{song?.track?.subtitle}</h3>
              </div>
          </div>
          <div >
              <PlayPause size={40} 
                song={song}
                handlePause={handlePauseClick} 
                handlePlay={handlePlayClick}
                isPlaying={isPlaying}
                activeSong={activeSong} />
          </div>
        </div>
    </>
  )
}

export default SearchSong