import React, { useState, useEffect } from "react";

const HotelFilter = () => {
  const [hotels, setHotels] = useState([]); // Dados vindos da API
  const [filteredHotels, setFilteredHotels] = useState([]); // Dados filtrados
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true); // Estado para exibir o carregamento
  const [error, setError] = useState(null); // Estado para exibir erros

  // Função para identificar o tipo de hospedagem usando regex
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
    return "unknown"; // Caso não identifique nenhum tipo
  };

  // Função para filtrar os hotéis
  const filterHotels = () => {
    if (filter === "") {
      setFilteredHotels(hotels); // Mostra todos se o filtro estiver vazio
    } else {
      const result = hotels.filter((hotel) =>
        identifyHotelType(hotel.name) === filter
      );
      setFilteredHotels(result);
    }
  };

  // Requisição para buscar hotéis na API
  const fetchHotels = async () => {
    try {
      const response = await fetch("https://hackathon-pda.onrender.com/api"); // Substitua com a rota correta
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
    fetchHotels(); // Carrega os hotéis ao montar o componente
  }, []);

  useEffect(() => {
    filterHotels(); // Filtra os hotéis sempre que o filtro ou os hotéis mudarem
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
              {/* Adicione outras informações do hotel conforme necessário */}
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
