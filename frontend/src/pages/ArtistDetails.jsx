import { useParams } from "react-router-dom"
import SearchSong from "../components/SearchSong";
import { Link } from "react-router-dom";
import { useGetArtistAlbumsQuery, useGetArtistDetailsQuery, useGetArtistSongsQuery } from "../redux/services/shazamCore";
import { Skeleton } from "@mui/material";
import PlayPause from "../components/PlayPause";
import { playPause} from "../redux/features/playerSlice";
import { useSelector, useDispatch } from "react-redux";
import {setSingleSong} from "../redux/features/playerSlice"
import ArtistSong from "../components/ArtistSong";
import AlbumCard from "../components/AlbumCard";

const ArtistDetails = () => {
  const dispatch = useDispatch();

  const activeSong = useSelector((state) => { return state.persistedReducer.player.activeSong});
  const isPlaying = useSelector((state) => { return state.persistedReducer.player.isPlaying})
  const { id } = useParams();
  const {data, isFetching, error} = useGetArtistDetailsQuery(id);
  const { data: topSongs, isFetchingSongs , errorSongs} = useGetArtistSongsQuery(id);
  const {data: albums, isFetchingAlbums, errorAlbums} = useGetArtistAlbumsQuery(id);
  const keys = albums ? Object.keys(albums?.resources?.albums).slice(0,3) : [];
  const img = data?.resources?.artists[id]?.attributes?.artwork?.url.slice(0,-13)+"1500x1000bb.jpg";
  const prev ='https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/59/be/e9/59bee9e3-0ea3-1d4b-155e-ff68455e9fcc/mza_13609771773827278092.png/2500x2500bb.jpg'
  return(
    <div className="flex flex-col">
      {
        isFetching ? <Skeleton style={{width:"100%"}} height={350} variant="rectangular" /> :
        <div className="w-full">
          <img src={img} className="w-full h-[350px] object-cover" />
          <div className="relative top-[-200px] left-[50px]">
            <h1 className=" text-white text-[70px] font-bold">{data?.resources?.artists[id]?.attributes?.name}</h1>
            <h3 className="text-gray-300 text-xl font-semibold">Arist</h3>
          </div>
        </div> 
      }
    
      <div className="px-10 relative top-[-100px]">
        {
          topSongs ?  <div className="flex flex-col w-full mt-5 cursor-pointer">
              <h1 className="text-white text-3xl font-bold">Top Songs </h1>
            {topSongs?.data?.slice(0,5).map((song)=>{
                return(
                  song? 
                  <>
                    <ArtistSong song={song} isPlaying={isPlaying}
                             activeSong={activeSong} />
                  </> :
                  <Skeleton variant="rectangular" className="w-full" />
                )
            })}
          </div> : <div></div> 
        }
      </div>
      <div className="px-10 relative top[-200px]">
        <h1 className="text-white text-3xl font-bold">Top Albums </h1>
        <div className="flex gap-4 w-full mt-5">
          {
                keys.map((key)=>{
                  return(
                    <AlbumCard album={albums?.resources?.albums[key]} />
                  )
                })
            }
        </div>
        </div>
    </div>
  )
}
export default ArtistDetails;
