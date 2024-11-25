import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconFilter from "./assets/icon-filter.png";

const FilterButton = ({ setKeyword }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = (e) => {
    if (!e.target.closest("#dropdown-menu") && !e.target.closest("#filter-button")) {
      setIsOpen(false);
    }
  };

  const handleFilterClick = (keyword) => {
    setKeyword(keyword);

    navigate(`?filter=${keyword}`);

    setIsOpen(false); 
  };

  const handleShowAll = () => {
    setKeyword("");

    navigate("?");

    setIsOpen(false); 
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <section>
      <div
        id="filter-button"
        className="bg-[#009EF9] flex items-center rounded-[5px] p-2 w-32 h-9 shadow-md cursor-pointer hover:scale-[98%]"
        onClick={toggleDropdown}
      >
        <div className="size-5 ml-2 mr-5">
          <img src={IconFilter} alt="icon filter" />
        </div>
        <p className="text-white">Filtrar</p>
      </div>

      {isOpen && (
        <div
          id="dropdown-menu"
          className="absolute mt-2 right-30 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
        >
          <div className="py-2 border-b border-gray-200">
            <button
              onClick={() => handleFilterClick("hotel")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-hotel text-[#009EF9]"></i>Hotéis
            </button>
            <button
              onClick={() => handleFilterClick("pousada")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-bed text-[#009EF9]"></i>Pousadas
            </button>
            <button
              onClick={() => handleFilterClick("resort")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-bed text-[#009EF9]"></i>Resorts
            </button>
            <button
              onClick={() => handleFilterClick("hostel")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-hotel text-[#009EF9]"></i>Hostels
            </button>
            <button
              onClick={() => handleFilterClick("hotel fazenda")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-hotel text-[#009EF9]"></i>Hotel Fazenda
            </button>
            <button
              onClick={() => handleFilterClick("flat")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-building text-[#009EF9]"></i>Flat
            </button>
          </div>
          <div className="py-2">
            <button
              onClick={handleShowAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-eye text-[#009EF9]"></i>limpar filtro
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FilterButton;
