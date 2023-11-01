import { Skeleton } from '@mui/material'
import React from 'react'
import Searchbar from './Searchbar'
import SearchSong from './SearchSong'
import ArtistCard from './ArtistCard'

const SearchSkeleton = () => {
  return (
    <div className="flex flex-col px-5 pt-6">
      <Searchbar />
      <div className="w-full flex xl:flex-row flex-col pt-8 gap-5">
        <div className="flex flex-col justify-start">
          <h1 className="text-white text-2xl font-semibold">Top Result</h1>
          <div className="flex flex-col w-[350px] p-4 mt-5 bg-white/5
                bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
                <div className="relative w-full group">
                    <Skeleton variant='circular' width={100} height={100} />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <Skeleton variant='text' width={150} />
                    <Skeleton variant='text' width={100} />
                </div>
            </div>
        </div>
        <div className="w-full flex flex-col justify-start">
          <h1 className="text-white text-2xl font-semibold">Songs</h1>
          <div className="flex flex-col mt-5 gap-3">
            <SearchSong />
            <SearchSong />
            <SearchSong />
            <SearchSong />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-7 flex-wrap ">
        <h1 className="text-white text-2xl font-semibold">Artists</h1>
        <div className="flex gap-5">
          <ArtistCard />
          <ArtistCard />
          <ArtistCard />
          <ArtistCard />
        </div>
      </div>
    </div>
  )
}

export default SearchSkeleton