import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card/card";
import defaultImage from "../../assets/404.png";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [starsFilter, setStarsFilter] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");
    const stars = params.get("stars");
    
    setKeyword(filter || "");
    setStarsFilter(stars || "");

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://hackathon-pda.onrender.com/api?keyword=${filter || ""}&stars=${stars || ""}`
        );
        const data = await response.json();
        setHotels(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setHotels([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="w-[90%] mt-10 place-items-center m-auto xl:w-[80%]">
      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : hotels.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum resultado encontrado para o filtro aplicado.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 2xl:grid-cols-6 gap-x-3">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              image={hotel.thumb || defaultImage || hotel.images[0]}
              avaliation={hotel.stars}
              name={hotel.name}
              category={hotel.city}
              handleImageError={handleImageError}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelList;
