import React, { useState, useEffect } from "react";

const HotelFilter = () => {
  const [hotels, setHotels] = useState([]); 
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filter, setFilter] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const identifyHotelType = (name) => {
    const regexTypes = {
      hotel: /hotel/i,
      pousada: /pousada|inn|guest\s?house/i,
      hostel: /hostel|albergue|backpackers/i,
      resort: /resort/i,
      hotelFazenda: /fazenda|country/i,
      flat: /flat|apart\s?hotel|aparthotel/i,
    };

    for (const [type, regex] of Object.entries(regexTypes)) {
      if (regex.test(name)) {
        return type;
      }
    }
    return "unknown";
  };

  const filterHotels = () => {
    if (filter === "") {
      setFilteredHotels(hotels); 
    } else {
      const result = hotels.filter((hotel) => {
        const nameMatch = identifyHotelType(hotel.name) === filter;
        const descriptionMatch = hotel.description && hotel.description.toLowerCase().includes(filter.toLowerCase());
  
        return nameMatch || (!nameMatch && descriptionMatch);
      });
      setFilteredHotels(result);
    }
  };
  

  const fetchHotels = async () => {
    try {
      const response = await fetch("https://hackathon-pda.onrender.com/api");
      if (!response.ok) {
        throw new Error("Erro ao buscar os hotéis.");
      }
      const data = await response.json();
      setHotels(data);
      setFilteredHotels(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(); 
  }, []);

  useEffect(() => {
    filterHotels(); 
  }, [filter, hotels]);

  if (loading) {
    return <p>Carregando hotéis...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      <h2>Filtrar Hotéis</h2>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="">Todos</option>
        <option value="hotel">Hotel</option>
        <option value="pousada">Pousada</option>
        <option value="hostel">Hostel</option>
        <option value="resort">Resort</option>
        <option value="hotelFazenda">Hotel Fazenda</option>
        <option value="flat">Flat/Apart Hotel</option>
      </select>

      <div>
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div key={hotel.id}>
              <h3>{hotel.name}</h3>
              <p>{hotel.description}</p>
              <p>Tipo: {identifyHotelType(hotel.name)}</p>
            </div>
          ))
        ) : (
          <p>Nenhum hotel encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default HotelFilter;
