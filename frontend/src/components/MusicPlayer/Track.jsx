import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => {

return(
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.images?.coverart  || ( activeSong.data ? activeSong?.data[0]?.attributes?.artwork?.url.slice(0,-13)+"1500x1000bb.jpg" : "")
    || activeSong?.attributes?.artwork?.url.slice(0,-13)+"1500x1000bb.jpg"} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title   || (activeSong.data ? activeSong?.data[0]?.attributes?.name : "") || activeSong?.attributes?.name }
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle  || (activeSong.data ? activeSong?.data[0]?.attributes?.artistName : "") || activeSong?.attributes?.artistName}
      </p>
    </div>
  </div>
);
}

export default Track;
