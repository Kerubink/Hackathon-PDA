import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center py-5 shadow-md relative md:justify-around px-5">
      {/* Logo */}
      <h3 className="text-2xl font-bold text-[#009EF9]">
        Host<span className="text-[#192A3D]">fy</span>
      </h3>

      {/* Botão de menu para telas pequenas */}
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

      {/* Menu para desktop */}
      <ul className="hidden md:flex gap-10 items-center">
        <li className="cursor-pointer transform hover:scale-95 transition-transform duration-200">
          <i className="fa-solid fa-hotel text-[#009EF9]"></i> Hoteis
        </li>
        <li className="cursor-pointer transform hover:scale-95 transition-transform duration-200">
          <i className="fa-solid fa-bed text-[#009EF9]"></i> Pousadas
        </li>
        <li className="cursor-pointer transform hover:scale-95 transition-transform duration-200">
          <i className="fa-solid fa-bed text-[#009EF9]"></i> Resorts
        </li>
      </ul>

      {/* Menu para telas pequenas */}
      <div
        className={`md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        } absolute top-full left-0 w-full bg-gray-100 z-50`} 
        id="mobile-menu"
      >
        <ul className="flex flex-col gap-5 p-5">
          <li className="cursor-pointer transform hover:scale-95 transition-transform duration-200">
            <i className="fa-solid fa-hotel text-[#009EF9]"></i> Hoteis
          </li>
          <li className="cursor-pointer transform hover:scale-95 transition-transform duration-200">
            <i className="fa-solid fa-bed text-[#009EF9]"></i> Pousadas
          </li>
          <li className="cursor-pointer transform hover:scale-95 transition-transform duration-200">
            <i className="fa-solid fa-bed text-[#009EF9]"></i> Resorts
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
