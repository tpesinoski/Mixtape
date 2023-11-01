import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const ArtistCard = ({artist}) => {
  return(
    <>
    <Link to={`/artists/${artist?.artist?.adamid}`}>
      <div className="flex flex-col w-[200px] p-4 mt-5 bg-white/5
                  bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full group flex items-center justify-center">
            <img src={artist?.artist?.avatar} className="w-[100px] h-[100px] rounded-full" />
        </div>
        <div className="mt-4 flex flex-col">
            <h1 className="text-white">{artist?.artist?.name}</h1>
            <h3 className="text-gray-300">Artist</h3>
        </div>
      </div>
    </Link>
    </>
  )
  
};

export default ArtistCard;
