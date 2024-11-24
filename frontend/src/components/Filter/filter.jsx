import React, { useState, useEffect } from "react";

const HotelFilter = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({
    hotel: 0,
    pousada: 0,
    hostel: 0,
    resort: 0,
    hotelFazenda: 0,
    flat: 0,
    total: 0,
  });

  const identifyHotelType = (hotel) => {
    const types = {
      hotel: /hotel|luxury|spa|business/i,
      pousada: /pousada|inn|guest\s?house|eco|chalé/i,
      hostel: /hostel|albergue|backpackers|dormitory/i,
      resort: /resort|piscinas termais|parque aquático|natureza exuberante|ofurô|lago|litoral|lazer completo|praia exclusiva/i,
      hotelFazenda: /hotel fazenda|fazenda|rural|sítio|natureza/i,
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

    const foundKeywords = {
      name: {},
      description: {},
    };

    if (hotel.type) scores[hotel.type] += 5;

    const analyzeText = (text, weight, field) => {
      if (!text) return;
      Object.entries(types).forEach(([type, regex]) => {
        const matches = text.match(regex);
        if (matches) {
          scores[type] += matches.length * weight;
          if (!foundKeywords[field][type]) {
            foundKeywords[field][type] = [];
          }
          foundKeywords[field][type].push(...matches);
        }
      });
    };

    analyzeText(hotel.name, 5, "name");
    analyzeText(hotel.description, 3, "description");

    if (hotel.amenities) {
      if (hotel.amenities.includes("piscina")) scores.resort += 5;
      if (hotel.amenities.includes("Wi-Fi gratuito")) scores.hostel += 4;
      if (hotel.amenities.includes("natureza")) scores.hotelFazenda += 4;
    }

    if (hotel.location) {
      if (/praia|litoral/i.test(hotel.location)) scores.resort += 4;
      if (/campo|interior/i.test(hotel.location)) scores.hotelFazenda += 3;
    }

    const maxScore = Math.max(...Object.values(scores));
    const classifiedType = Object.keys(scores).find(
      (type) => scores[type] === maxScore
    );

    console.log(`Hospedagem: ${hotel.name}`);
    console.log("Palavras-chave encontradas no nome:", foundKeywords.name);
    console.log("Palavras-chave encontradas na descrição:", foundKeywords.description);
    console.log("Pontuações finais por tipo:", scores);

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

  const calculateCounts = () => {
    const newCounts = {
      hotel: 0,
      pousada: 0,
      hostel: 0,
      resort: 0,
      hotelFazenda: 0,
      flat: 0,
      total: hotels.length,
    };

    hotels.forEach((hotel) => {
      const { type } = identifyHotelType(hotel);
      newCounts[type] += 1;
    });

    setCounts(newCounts);
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
    calculateCounts();
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
        <option value="">Todos ({counts.total})</option>
        <option value="hotel">Hotel ({counts.hotel})</option>
        <option value="pousada">Pousada ({counts.pousada})</option>
        <option value="hostel">Hostel ({counts.hostel})</option>
        <option value="resort">Resort ({counts.resort})</option>
        <option value="hotelFazenda">Hotel Fazenda ({counts.hotelFazenda})</option>
        <option value="flat">Flat/Apart Hotel ({counts.flat})</option>
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
