import { ArtistCard, Searchbar, SongBar } from "../components";
import { useGetSearchQuery } from "../redux/services/shazamCore";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import SkeletonCard from "../components/SkeletonCard";
import { Skeleton } from "@mui/material";
import SearchSong from "../components/SearchSong";
import SearchSkeleton from "../components/SearchSkeleton";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Search = () =>{
  
  const [term,setTerm] = useState('');

  const { data, isFetching, error } = useGetSearchQuery(term);

  const topArtist = data?.artists?.hits[0].artist;
  
  const handleSearch = (e) =>{
    setTerm(e.target.value);
  }
  useEffect(()=>{
    console.log(data)
  })

    return(
      <div className="flex flex-col px-5 pt-6">
        <Searchbar handleSearch={handleSearch} />
        <div className="w-full flex xl:flex-row flex-col px-3 pt-8 gap-7">
          <div className="flex flex-col justify-start">
            <h1 className="text-white text-2xl font-semibold">Top Result</h1>
            <Link to={`/artists/${topArtist?.adamid}`}>
            <div className="flex flex-col w-[350px] p-4 mt-5 bg-white/5
                  bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
                  <div className="relative w-full group">
                    {data ? 
                      <img src={topArtist?.avatar || ""} alt="Artist image" className="rounded-full w-[100px] h-[100px]" /> :
                      <Skeleton variant="circular" height={100} width={100} />
                    }
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                      <h1 className="text-white text-2xl">{topArtist?.name || ""}</h1>
                      <h3 className="text-gray-300">Artist</h3>
                  </div>
              </div>
            </Link>
          </div>
          <div className="w-full flex flex-col justify-start">
            <h1 className="text-white text-2xl font-semibold">Songs</h1>
            {
              data?  <div className="flex flex-col mt-5 gap-3">
              { data?.tracks?.hits?.slice(0,3).map((song)=>{
                return(
                  <SearchSong song={song} />
                )
              })}
            </div> : <div className="flex flex-col w-[100%] h-[180px] p-4 mt-5 bg-white/5
                  bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
                  </div> 
            }
          </div>
        </div>
        <div className="flex flex-col mt-10 px-3 flex-wrap ">
          <h1 className="text-white text-2xl font-semibold">Artists</h1>
          {
            data? <div className="flex gap-5">
                    {data?.artists?.hits?.slice(0,5).map((artist)=>{
                        return(
                          <ArtistCard artist={artist} />
                        )
                    })}
                  </div> :
              <div className="flex gap-5">
                {
                  [1, 2, 3].map(() => {
                    return (
                      <div className="flex flex-col w-[300px] p-4 mt-5 bg-white/5
                      bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
                        <Skeleton variant="circular" height={100} width={100} />
                        <Skeleton variant="text" height={20} width={100} style={{marginTop: "20px"}} />
                      </div>
                    )
                  })
                }
              </div>
          }
          
        </div>
      </div>
    );
  

  
} 

export default Search;
