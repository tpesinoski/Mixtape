import {FaPlayCircle, FaPauseCircle} from "react-icons/fa"

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay,bg,size}) => (
  isPlaying && (activeSong?.title || activeSong?.attributes?.name )=== (song?.title || song?.attributes?.name) ?  (
    <FaPauseCircle size={size || 35} color={bg} className="text-gray-300"  onClick={handlePause}/>
  ) : 
  (
    <FaPlayCircle size={size || 35}  color={bg} className="text-gray-300" onClick={handlePlay}/>
  )

);

export default PlayPause;
