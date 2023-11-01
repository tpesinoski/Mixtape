import React from 'react'

const AlbumCard = ({album}) => {
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5
     backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <img src={album?.attributes?.artwork?.url.slice(0,-13)+"1500x1000bb.jpg"} style={{ height:"100%"}}/>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">{album?.attributes?.name}</p>
        <p className="text-sm text-gray-300 truncate mt-1">
        {album?.attributes?.artistName}
        </p>
      </div>
    </div>
  )
}

export default AlbumCard