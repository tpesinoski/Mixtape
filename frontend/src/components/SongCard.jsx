import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({song, index, isPlaying, activeSong, i ,data}) => {

  const dispatch = useDispatch();

 const handlePauseClick = () => {
    dispatch(playPause(false))
  }
 const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true))
 }

  return(
    <div className="flex flex-col w-[250px] p-4 bg-white/5
    bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-[#242424] bg-opacity-80
        group-hover:flex ${setActiveSong?.title === song.title ? 'flex bg-[#242424] bg-opacity-70' : 'hidden' }`}>
          <PlayPause song={song}
          handlePause={handlePauseClick} 
          handlePlay={handlePlayClick}
          isPlaying={isPlaying}
          activeSong={activeSong}/>
        </div>
        <img src={song.images?.coverart} style={{ height:"100%"}}/>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate"><Link to={`/songs/${song?.key}`}>{song.title}</Link></p>
        <p className="text-sm text-gray-300 truncate mt-1">
          <Link to={`/artists/${song?.artists?.at(0).adamid}`}>{song.subtitle}</Link>
        </p>
      </div>
    </div>
  );
}


export default SongCard;
