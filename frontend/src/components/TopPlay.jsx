import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide} from "swiper/react"
import { FreeMode } from "swiper";

import 'swiper/css'
import 'swiper/css/free-mode'
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import PlayPause from "./PlayPause";
import Loader from "./Loader";
import SkeletonLoad from "./SkeletonLoad";

const TopChartCard = ({song,i,isPlaying,activeSong,handlePauseClick,handlePlayClick}) =>{
  return(
    <div className="w-full flex flex-row items-center hover:bg-[#87878752] py-2 p-4 rounded-lg 
    cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i+1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img className="w-20 h-20 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists?.at(0)?.adamid}`}>
            <p className="text-ase text-gray-300 mt-1">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause handlePlay={handlePlayClick} handlePause={handlePauseClick}
      isPlaying={isPlaying} activeSong={activeSong}
      song={song}/>
    </div>
  )
}

const TopPlay = () => {

  const dispatch = useDispatch();
  const activeSong = useSelector((state)=>{
    return state.persistedReducer.player.activeSong});
    const isPlaying = useSelector((state) => { return state.persistedReducer.player.isPlaying})
  const divRef = useRef(null);

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
 const handlePlayClick = (song,i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true))
 }
 const {data, isFetching, error} = useGetTopChartsQuery();
 const topPlays = data?.tracks.slice(0,5);



  if(isFetching) return <SkeletonLoad />

  return(
    <div  className=" ml-0 xl:mb-0 mb-6 pr-3 pt-6 pl-5 flex-1 xl:max-w-[550px] bg-[#1a1a1a] max-w-full flex flex-col" >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song,i)=>{
            return(
              <TopChartCard song={song} i={i} key={song.key} 
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={()=>handlePlayClick(song,i)}/>
            )
            
          })}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
        </div>
        <Swiper slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds
        modules={[FreeMode]} className="mt-4">
          {topPlays?.map((song,i)=>{
            return (
              <SwiperSlide
              key={song.key} style={{width:"25%",height:"auto"}} 
              className="shadow-lg rounded-full animate-slideright">

                <Link to={`/artists/${song?.artists?.at(0).adamid}`}>
                  <img src={song?.images?.background} alt="name" className="rounded-full w-full object-cover" />
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay;