import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import  imageToGradient from 'image-to-gradient';
import { DetailsHeader,Error ,Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetArtistSongsQuery, useGetSongDetailsQuery, useGetSongDetailsV2Query } from "../redux/services/shazamCore";
import { useEffect, useState } from "react";
import PlayPause from "../components/PlayPause";
import grad from "gradient-from-image";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import ArtistTopSong from "../components/ArtistTopSong";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import {setSingleSong} from "../redux/features/playerSlice";

const SongDetails = () => 
{   
    const { songid } = useParams();
    const dispatch = useDispatch();
    const activeSong = useSelector((state)=>{
    return state.persistedReducer.player.activeSong});
    const isPlaying = useSelector((state) => { return state.persistedReducer.player.isPlaying})
    var {data, isFetchingSong, errorSong} = {};
    songid.length > 9 ? {data } = useGetSongDetailsV2Query(songid) : {data} = useGetSongDetailsQuery(songid);
    const {data: songs, isFetchingSongs, errorSongs } = useGetTopChartsQuery();
    const artist = data?.artists?.at(0).adamid;
    const {data: artistData, isFetching, error } = useGetArtistSongsQuery(artist);
    console.log(artistData?.data?.slice(0,3))
    console.log(data)

    const handlePauseClick = () => {
        dispatch(playPause(false))
      }
     const handlePlayClick = () => {
        dispatch(setSingleSong(data));
        dispatch(playPause(true))
     }
     if(songid.length>9){
        return(
            <div className="flex flex-col">
            <div className={`w-full flex justify-between gap-8 p-10 pl-8 `} style={{background:`linear-gradient(to bottom, #${data?.data[0]?.attributes?.artwork?.bgColor},
                 #${data?.data[0]?.attributes?.artwork?.textColor3})`}}>
                <div className="flex items-end gap-8">
                <div>
                    {
                        data ? <img src={data?.data[0]?.attributes?.artwork?.url.slice(0,-13)+"1500x1000bb.jpg"} alt="coverart" width={250} height={250} /> :
                        <Skeleton variant="rectangular" width={250} height={250} />
                    }
                </div>
                <div className="flex flex-col pb-5 gap-5">
                    {
                        data ? <><h1 className="text-white font-bold text-4xl">{data?.data[0]?.attributes.name}</h1>
                        <h3 className="text-white">{data?.data[0]?.attributes.artistName}</h3></> :
                        <>
                            <Skeleton variant="text" width={250} />
                            <Skeleton variant="text" width={150} />
                        </>
                    }
                    
                </div>
                </div>
                <div className="flex items-end">
                    <PlayPause size={80} 
                    song={data}
                    handlePause={handlePauseClick} 
                    handlePlay={handlePlayClick}
                    isPlaying={isPlaying}
                    activeSong={activeSong} />
                </div>
            </div>
            <div className="w-full p-10 flex flex-col">
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-3xl text-white font-bold">Lyrics</h1>
                    <p className="text-gray-300" >Sorry we have not found lyrics for this song</p>
                </div>

            </div>
        </div>
        )
     }
    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between gap-8 p-10 pl-8 bg-[rgb(101,255,160)] bg-gradient-to-b
             from-[rgba(101,255,160,1)]
             via-[rgba(36,36,36,0.76234243697479)]
             to-[rgba(36,36,36,1)]">
                <div className="flex items-end gap-8">
                <div>
                    {
                        data ? <img src={data?.images?.coverart} alt="coverart" width={250} height={250} /> :
                        <Skeleton variant="rectangular" width={250} height={250} />
                    }
                    
                </div>
                <div className="flex flex-col pb-5 gap-5">
                    {
                        data ? <><h1 className="text-white font-bold text-4xl">{data?.title}</h1>
                        <h3 className="text-white">{data?.subtitle}</h3></> :
                        <>
                            <Skeleton variant="text" width={250} />
                            <Skeleton variant="text" width={150} />
                        </>
                    }
                    
                </div>
                </div>
                <div className="flex items-end">
                    <PlayPause size={80} 
                    song={data}
                    handlePause={handlePauseClick} 
                    handlePlay={handlePlayClick}
                    isPlaying={isPlaying}
                    activeSong={activeSong} />
                </div>
            </div>
            <div className="w-full p-10 flex flex-col">
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-3xl text-white font-bold">Lyrics</h1>
                        {
                            data?.sections[1]?.text?.map((text)=>{
                                return(
                                    <p className="text-gray-300">{text}</p>
                                )
                            }) || <p className="text-gray-300" >Sorry we have not found lyrics for this song</p>
                        }
                </div>

            </div>
        </div>
    );

}
export default SongDetails;
