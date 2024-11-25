import Header from "../../components/header/header";
import FilterButton from "../../components/ButtonFilter/filterButton";
import RegisterButton from "../../components/buttonRegister/registerButton";
import HotelList from "../../components/hotelList/hotelList";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchAccommodation() {
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleFilterClick = (keyword) => {
    setKeyword(keyword);
    navigate(`?filter=${keyword}`);
  };

  const handleShowAll = () => {
    setKeyword("");
    navigate("?");
  };

  return (
    <>
      <Header />

      <div className="flex w-full items-center justify-center p-6 gap-5  border-b">
        <div className="flex gap-4 overflow-y-auto">
          <button
            onClick={handleShowAll}
            className="px-4 py-2 flex flex-col flex-nowrap justify-center items-center gap-1 min-w-fit text-black rounded-md hover:scale-95"
          >
            <i class="fa-solid fa-border-all"></i>Todos
          </button>
          <button
            onClick={() => handleFilterClick("hotel")}
            className="px-4 py-2 flex flex-col flex-nowrap justify-center items-center gap-1 min-w-fit text-black rounded-md hover:scale-95"
          >
            <i className="fa-solid fa-hotel text-[#000] "></i>Hotéis
          </button>
          <button
            onClick={() => handleFilterClick("pousada")}
            className="px-4 py-2 flex flex-col flex-nowrap justify-center items-center gap-1 min-w-fit text-black rounded-md hover:scale-95"
          >
            <i class="fa-solid fa-house"></i>Pousadas
          </button>
          <button
            onClick={() => handleFilterClick("resort")}
            className="px-4 py-2 flex flex-col flex-nowrap justify-center items-center gap-1 min-w-fit text-black rounded-md hover:scale-95"
          >
            <i class="fa-solid fa-umbrella-beach"></i>Resorts
          </button>
          <button
            onClick={() => handleFilterClick("hostel")}
            className="px-4 py-2 flex flex-col flex-nowrap justify-center items-center gap-1 min-w-fit text-black rounded-md hover:scale-95"
          >
            <i class="fa-solid fa-bed"></i>Hostels
          </button>
          <button
            onClick={() => handleFilterClick("hotel fazenda")}
            className="px-4 py-2 flex flex-col flex-nowrap justify-center items-center gap-1 min-w-fit text-black rounded-md hover:scale-95"
          >
            <i class="fa-solid fa-wheat-awn"></i>Hotel Fazenda
          </button>
          <button
            onClick={() => handleFilterClick("flat")}
            className="px-4 py-2 flex flex-col flex-nowrap justify-center items-center gap-1 min-w-fit text-black rounded-md hover:scale-95"
          >
            <i className="fa-solid fa-building text-[#000] "></i>Flat
          </button>
        </div>

        <FilterButton setFilteredData={setFilteredData} />
      </div>

      <HotelList keyword={keyword} />
    </>
  );
}
