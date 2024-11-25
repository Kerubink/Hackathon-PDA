import React, { useState } from 'react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="flex justify-between items-center py-5 shadow-md relative md:justify-around px-5">

      <h3 className="text-2xl font-bold text-[#009EF9]">
        Host<span className="text-[#192A3D]">fy</span>
      </h3>

      <button
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden"
        aria-controls="navbar-default"
        aria-expanded={isMenuOpen ? 'true' : 'false'}
        onClick={toggleMenu}
      >
        <span className="sr-only">Open main menu</span>
        <i className="fa-solid fa-bars text-2xl"></i>
      </button>

      <ul className="hidden md:flex gap-10 items-center">
        <button className='border-2 border-[#192A3D] rounded-full p-2 px-5 text-[#192A3D] text-[14px] font-semibold shadow-md  hover:scale-95 transition-all'>Anuncie seu espaço</button>
      </ul>

      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'
          } absolute top-full left-0 w-full bg-gray-100 z-50`}
        id="mobile-menu"
      >
        <ul className="flex flex-col gap-5 p-5">
          <button className='border-2 border-[#192A3D] rounded-full p-2 px-5 text-[#192A3D] text-[14px] font-semibold'>Anuncie seu espaço</button>
        </ul>
      </div>
    </header>
  );
};
export default Header;