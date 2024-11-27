import React, { useState } from 'react';
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    stars: '',
    cep: '',
    address: '',
    city: '',
    state: '',
    latitude: '',
    longitude: '',
  });
  const [loadingAddress, setLoadingAddress] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

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
        city: data.localidade,
        state: data.uf,
      }));
    } catch (error) {
      alert('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando dados:', formData);
    alert('Dados enviados com sucesso!');
  };

  return (
    <header className="flex justify-between items-center py-5 shadow-md relative md:justify-around px-5">
      <h3 className="text-2xl font-bold text-[#009EF9]">
        Host<span className="text-[#192A3D]">fy</span>
      </h3>

      <button
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden"
        aria-controls="navbar-default"
        aria-expanded={isMenuOpen ? 'true' : 'false'}
        onClick={toggleMenu}
      >
        <span className="sr-only">Open main menu</span>
        <i className="fa-solid fa-bars text-2xl"></i>
      </button>

      <ul className="hidden md:flex gap-10 items-center">
        <button
          className="border-2 border-[#192A3D] rounded-full p-2 px-5 text-[#192A3D] text-[14px] font-semibold shadow-md hover:scale-95 transition-all"
          onClick={toggleForm}
        >
          Anuncie seu espaço
        </button>
      </ul>

      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'
          } absolute top-full left-0 w-full bg-gray-100 z-50`}
        id="mobile-menu"
      >
        <ul className="flex flex-col gap-5 p-5">
          <button
            className="border-2 border-[#192A3D] rounded-full p-2 px-5 text-[#192A3D] text-[14px] font-semibold"
            onClick={toggleForm}
          >
            Anuncie seu espaço
          </button>
        </ul>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-full sm:w-96">
            <h2 className="text-2xl font-semibold mb-4">Criar Novo Local de Hospedagem</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label>Tipo:</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                >
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
                  className="border p-2 w-full"
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
                  className="border p-2 w-full"
                />
                <button
                  type="button"
                  onClick={handleCepSearch}
                  disabled={loadingAddress}
                  className="bg-blue-500 text-white p-2 mt-2"
                >
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
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Cidade:</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Estado:</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Latitude:</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Longitude:</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 mt-4 w-full"
              >
                Criar Local
              </button>
            </form>
            <button
              onClick={toggleForm}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
