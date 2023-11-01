import React from 'react'
import { Link } from 'react-router-dom'
import PlayPause from './PlayPause'

const ArtistTopSong = ({song}) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
 const handlePlayClick = () => {
    dispatch(setSingleSong(song));
    dispatch(playPause(true));
 }
 const activeSong = useSelector((state)=>{
  return state.persistedReducer.player.activeSong});
  const isPlaying = useSelector((state) => { return state.persistedReducer.player.isPlaying})

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#87878752] py-2 p-4 rounded-lg 
    cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i+1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img className="w-20 h-20 rounded-lg" src={song?.attributes.artwork.url} alt={song?.attributes.name} />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.id}`}>
            <p className="text-xl font-bold text-white">{song?.attributes.name}</p>
          </Link>
        </div>
      </div>
      <PlayPause handlePlay={handlePlayClick} handlePause={handlePauseClick}
      isPlaying={isPlaying} activeSong={activeSong}
      song={song}/>
    </div>
  )
}

export default ArtistTopSong