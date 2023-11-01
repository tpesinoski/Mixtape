import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri"
import { links } from "../assets/constants";
import {HiOutlineHome} from "react-icons/hi"
import {FiSearch} from "react-icons/fi"
import { HiOutlineMenu, HiOutlineLogout } from "react-icons/hi";
import { Button } from "@mui/material";


const NavLinks = () => {
  const handleLogut = () => {
    localStorage.clear();
    window.location.reload();
  }
  return(
    <div className="mt-10">
      <Link to={`/`} className="flex flex-row justify-start items-center my-8  text-mnpm run dev font-medium
          text-gray-400">
        <HiOutlineHome className="w-8 h-8 mr-2 ml-2" />
        <h1></h1>
      </Link>
      <Link to={`/search`} className="flex flex-row justify-start items-center my-8  text-mnpm run dev font-medium
          text-gray-400">
        <FiSearch className="w-8 h-8 mr-2 ml-2" />
        <h1></h1>
      </Link>
      <div
        onClick={handleLogut}
        style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center",cursor:"pointer" }}>
        <HiOutlineLogout className="w-8 h-8 mr-2 ml-2 text-gray-400" />
      </div>
    </div>
  );
}

const Sidebar = () => {
  const [mobileMenuOpen,setMobileMenuOpen] = useState(false);
  return(
    <>
      <div className="md:flex hidden flex-col w-[110px] py-8 px-4 bg-[#1a1a1a] items-center">
        <img src="/logo1.png" alt="logo" className="w-18 h-18 object-contain"/>
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ?
           ( <RiCloseLine onClick={()=>setMobileMenuOpen(false)} className="w-6 h-6 text-white mr-2" /> ) :
           <HiOutlineMenu onClick={()=>setMobileMenuOpen(true)} className="w-6 h-6 text-white mr-2"/>
        }
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-[#00000050] backdrop-blur-lg z-10 p-6 mg:hidden smooth-transition
      ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src="/logo1.png" alt="logo" className="w-full h-14 object-contain"/>
        <NavLinks handleClick={()=>setMobileMenuOpen(false)} />
      </div>
    </>
  );
}
export default Sidebar;
