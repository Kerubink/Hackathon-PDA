import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterButton = ({ setKeyword, setHotels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stars, setStars] = useState(null); 
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = (e) => {
    if (
      !e.target.closest("#dropdown-menu") &&
      !e.target.closest("#filter-button")
    ) {
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
    setStars(null); 
    navigate("?");
    setIsOpen(false);
  };

  const handleStarsFilter = (stars) => {
    setStars(stars); 
    setIsOpen(false);
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch("https://hackathon-pda.onrender.com/api");
      const data = await response.json();
      const filteredHotels = stars
        ? data.filter((hotel) => hotel.stars === stars)
        : data;
      setHotels(filteredHotels); 
    } catch (error) {
      console.error("Erro ao buscar os dados dos hotéis:", error);
    }
  };

  useEffect(() => {
    fetchHotels(); 
  }, [stars]); 

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <section>
      <div
        id="filter-button"
        className="text-black flex items-center rounded-[10px] border-[1px] border-gray-400 p-2 w-32 h-15 cursor-pointer hover:border-black"
        onClick={toggleDropdown}
      >
        <div className="size-5 ml-2 mr-5">
          <i className="fa-solid fa-filter"></i>
        </div>
        <p className="text-black">Filtrar</p>
      </div>

      {isOpen && (
        <div
          id="dropdown-menu"
          className="absolute mt-2 right-30 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
        >
          <div className="py-2">
            <h3 className="px-4 py-2 text-sm text-gray-700">Filtrar por Estrelas</h3>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarsFilter(star)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <i className="fa-solid fa-star text-[#009EF9]"></i>{star} Estrela{star > 1 ? "s" : ""}
              </button>
            ))}
          </div>

          <div className="py-2">
            <button
              onClick={handleShowAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-eye text-[#009EF9]"></i>Limpar filtro
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FilterButton;
