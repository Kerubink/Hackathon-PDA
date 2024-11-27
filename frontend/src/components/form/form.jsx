import React, { useState } from 'react';
import axios from 'axios';

const CreateHotelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    stars: '',
    cep: '',
    address: '',
    district: '',
    city: '',
    state: '',
    country: 'Brasil', // Valor padrão
    latitude: '',
    longitude: '',
    description: '',
    cnpj: '',
  });

  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingCoordinates, setLoadingCoordinates] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCepSearch = async () => {
    if (!formData.cep) return;
    setLoadingAddress(true);

    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`);
      if (data.erro) {
        alert('CEP inválido ou não encontrado.');
        setLoadingAddress(false);
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        address: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf,
      }));
    } catch (error) {
      alert('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleGetCoordinates = async () => {
    if (!formData.address || !formData.city || !formData.state) {
      alert('Preencha o endereço completo antes de buscar as coordenadas.');
      return;
    }

    setLoadingCoordinates(true);

    try {
      const address = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}`;
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`
      );

      if (data.length === 0) {
        alert('Endereço não encontrado.');
        return;
      }

      const location = data[0]; // Pega o primeiro resultado
      setFormData((prevData) => ({
        ...prevData,
        latitude: location.lat,
        longitude: location.lon,
      }));
    } catch (error) {
      alert('Erro ao buscar as coordenadas. Tente novamente.');
    } finally {
      setLoadingCoordinates(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Adicione sua lógica para envio da API aqui
    console.log('Enviando dados:', formData);
    alert('Dados enviados com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Novo Local de Hospedagem</h2>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Tipo:</label>
        <select name="type" value={formData.type} onChange={handleInputChange} required>
          <option value="">Selecione</option>
          <option value="hotel">Hotel</option>
          <option value="resort">Resort</option>
          <option value="hostel">Hostel</option>
          <option value="albergue">Albergue</option>
          <option value="pousada">Pousada</option>
          <option value="hotel fazenda">Hotel Fazenda</option>
          <option value="flat">Flat</option>
        </select>
      </div>
      <div>
        <label>Estrelas:</label>
        <input
          type="number"
          name="stars"
          value={formData.stars}
          onChange={handleInputChange}
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label>CEP:</label>
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleCepSearch} disabled={loadingAddress}>
          {loadingAddress ? 'Buscando...' : 'Buscar Endereço'}
        </button>
      </div>
      <div>
        <label>Endereço:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Bairro:</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Cidade:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Estado:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Latitude:</label>
        <input
          type="text"
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="text"
          name="longitude"
          value={formData.longitude}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleGetCoordinates} disabled={loadingCoordinates}>
          {loadingCoordinates ? 'Buscando...' : 'Buscar Coordenadas'}
        </button>
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>CNPJ:</label>
        <input
          type="text"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Criar Local</button>
    </form>
  );
};

export default CreateHotelForm;
