import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, Discover, Search, SongDetails, Login } from './pages';
import { useEffect } from 'react';
import axios from "axios";

const App = () => {
  const activeSong = useSelector((state)=> {
    return state.persistedReducer.player.activeSong
  });

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#242424]">
        <div className=" h-[100vh] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Discover />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>
      {/* style={{background:`linear-gradient(to bottom, #${activeSong?.data[0].attributes?.artwork?.bgColor},
                 #${activeSong?.data[0].attributes?.artwork?.textColor3 ||})` }} */}
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup backdrop-blur-lg rounded-t-3xl z-10"
        style={ activeSong.attributes ? {background:`linear-gradient(to bottom, #${activeSong?.attributes?.artwork?.bgColor},
          #${activeSong?.attributes?.artwork?.textColor3})` } : {background:
            `linear-gradient(to bottom, #${activeSong?.images?.joecolor?.slice(2,8)},
              #${activeSong?.images?.joecolor.slice(-6)})`}} >
          <MusicPlayer />
        </div>
    </div>
  );
};

export default App;
