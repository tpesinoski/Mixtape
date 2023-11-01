import { FiSearch } from "react-icons/fi";

const Searchbar = ({handleSearch}) => (
  <div className="w-full flex flex-wrap justify-between px-5">
    <div>
      <h1 className="text-white text-2xl font-semibold"></h1>
    </div>
    <div className="flex items-center justify-between rounded-3xl border-white border-2 p-2 px-3 w-[250px] bg-white">
      <input type="text" className="outline-none" placeholder="Song..." onChange={handleSearch}/>
      <FiSearch color="black" size={25} />
    </div>
  </div>
);

export default Searchbar;
