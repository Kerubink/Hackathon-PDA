import React, { useState, useEffect } from "react";

const HotelFilter = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const identifyHotelType = (hotel) => {
    const types = {
      hotel: /hotel|luxury|spa|business/i,
      pousada: /pousada|inn|guest\s?house|eco|chalé/i,
      hostel: /hostel|albergue|backpackers|dormitory/i,
      resort: /resort|piscina|campo\s?de\s?golfe|parque/i,
      hotelFazenda: /hotel fazenda|fazenda|country|rural|natureza/i,
      flat: /flat|apart\s?hotel|aparthotel|studio|residencial/i,
    };

    const scores = {
      hotel: 0,
      pousada: 0,
      hostel: 0,
      resort: 0,
      hotelFazenda: 0,
      flat: 0,
    };

    if (hotel.type) {
      scores[hotel.type] += 5;
    }

    if (hotel.name) {
      Object.entries(types).forEach(([type, regex]) => {
        if (regex.test(hotel.name)) {
          scores[type] += 4; // Nome tem maior peso
        }
      });
    }
    if (hotel.description) {
      Object.entries(types).forEach(([type, regex]) => {
        if (regex.test(hotel.description)) {
          scores[type] += 3; // Descrição tem peso médio
        }
      });
    }

    if (hotel.price) {
      if (hotel.price > 300) {
        scores.resort += 3;
        scores.hotel += 2;
        scores.flat += 1;
      } else if (hotel.price < 100) {
        scores.hostel += 3;
        scores.pousada += 2;
      } else {
        scores.hotel += 2;
        scores.pousada += 1;
      }
    }

    if (hotel.amenities) {
      if (hotel.amenities.includes("piscina") || hotel.amenities.includes("campo de golfe")) {
        scores.resort += 5;
      }
      if (hotel.amenities.includes("Wi-Fi gratuito") || hotel.amenities.includes("cozinha compartilhada")) {
        scores.hostel += 3;
      }
      if (hotel.amenities.includes("natureza") || hotel.amenities.includes("trilha")) {
        scores.hotelFazenda += 4;
        scores.pousada += 2;
      }
    }

    const maxScore = Math.max(...Object.values(scores));
    if (maxScore === 0) {
      // Fallback para itens zerados
      if (hotel.price && hotel.price > 300) return { type: "resort", scores };
      if (hotel.price && hotel.price < 100) return { type: "hostel", scores };
      return { type: "hotel", scores };
    }

    const classifiedType = Object.keys(scores).find(
      (type) => scores[type] === maxScore
    );
    return { type: classifiedType, scores };
  };

  const filterHotels = () => {
    if (filter === "") {
      setFilteredHotels(hotels);
    } else {
      const result = hotels.filter((hotel) => {
        const { type } = identifyHotelType(hotel);
        return type === filter;
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
              <p>Tipo: {identifyHotelType(hotel).type}</p>
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
