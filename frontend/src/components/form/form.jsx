import React, { useState, useEffect } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cep: "",
    uf: "",
    pais: "Brasil", 
    cidade: "",
    bairro: "",
    descricao: "",
    arquivo: "",
    longitude: "",
    latitude: "",
    opcoes: [],
  });

  const [cepError, setCepError] = useState(""); 
  const [loadingCep, setLoadingCep] = useState(false); 

  const opcoesDisponiveis = ["WiFi gratuito", "Café da manhã", "Mini-bar"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      arquivo: e.target.files[0],
    }));
  };

  const toggleOpcao = (opcao) => {
    setFormData((prevState) => {
      const isSelecionado = prevState.opcoes.includes(opcao);
      return {
        ...prevState,
        opcoes: isSelecionado
          ? prevState.opcoes.filter((item) => item !== opcao)
          : [...prevState.opcoes, opcao],
      };
    });
  };

  const consultarCep = async (cep) => {
    if (cep.length === 8) {
      setLoadingCep(true);
      setCepError("");
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        if (!response.ok) {
          throw new Error("CEP não encontrado ou inválido.");
        }
        const data = await response.json();

        if (data.errors) {
          setCepError("CEP inválido ou não encontrado.");
          setLoadingCep(false);
          return;
        }

        setFormData((prevState) => ({
          ...prevState,
          bairro: data.neighborhood || "",
          cidade: data.city || "",
          uf: data.state || "",
        }));
        setCepError(""); 
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setCepError("Erro ao buscar CEP. Verifique se é válido.");
      } finally {
        setLoadingCep(false);
      }
    } else {
      setCepError("O CEP deve conter 8 dígitos.");
    }
  };

  useEffect(() => {
    if (formData.cep.length === 8) {
      consultarCep(formData.cep);
    }
  }, [formData.cep]);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const dataToSend = {
      name: formData.nome || "Nome do espaço",
      type: formData.seuEspaco || null,
      stars: parseInt(formData.stars || 0, 10),
      latitude: formData.latitude || "0.000000",
      longitude: formData.longitude || "0.000000",
      description: formData.descricao || "",
      address: `${formData.cidade}, ${formData.uf}`,
      district: formData.bairro || "",
      city: formData.cidade || "",
      state: formData.uf || "",
      country: formData.pais || "BR",
      placeId: formData.placeId || "placeholder-place-id",
      thumb: formData.arquivo ? URL.createObjectURL(formData.arquivo) : null,
      images: [],
      amenities: formData.opcoes || [],
      pois: [],
      reviews: [],
      cnpj: "12.345.678/0001-90",
    };
  
    console.log("Dados a serem enviados:", dataToSend);
  
    try {
      const response = await fetch("https://hackathon-pda.onrender.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `Erro ao enviar os dados: ${JSON.stringify(errorResponse)}`
        );
      }
  
      const responseData = await response.json();
      console.log("Dados enviados com sucesso:", responseData);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md relative"
      >
        <i className="fa-solid fa-xmark text-[30px] text-[#192A3D] cursor-pointer absolute top-[15px] right-[20px]"></i>
        <h1 className="text-lg font-bold text-gray-800 mb-6 text-center">
          Seja um <span className="text-[#009EF9]">anfitrião.</span>
        </h1>

        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          required
        />

        <label
          htmlFor="seuEspaco"
          className="block text-sm font-medium text-gray-700"
        >
          Seu espaço é
        </label>
        <select
          name="seuEspaco"
          id="seuEspaco"
          value={formData.seuEspaco || ""}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          required
        >
          <option value="" disabled>
            Selecione
          </option>
          <option value="Hotel">Hotel</option>
          <option value="Fazenda">Fazenda</option>
          <option value="Resort">Resort</option>
          <option value="Hostels">Hostels</option>
          <option value="Hotel Fazenda">Hotel Fazenda</option>
          <option value="Flat">Flat</option>
        </select>

        <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
          CEP
        </label>
        <div className="relative mb-4">
          <input
            type="text"
            name="cep"
            id="cep"
            placeholder="CEP"
            value={formData.cep}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
          {loadingCep && (
            <span className="text-blue-500 text-sm mt-1">Carregando CEP...</span>
          )}
          {cepError && (
            <span className="text-red-500 text-sm mt-1">{cepError}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="uf"
            id="uf"
            placeholder="UF"
            value={formData.uf}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="pais"
            id="pais"
            placeholder="País"
            value={formData.pais}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="cidade"
            id="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="bairro"
            id="bairro"
            placeholder="Bairro"
            value={formData.bairro}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          name="descricao"
          id="descricao"
          placeholder="Descrição."
          value={formData.descricao}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          required
        ></textarea>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adicionar arquivo
        </label>
        <div className="flex items-center space-x-4 mb-4">
          <label
            htmlFor="arquivo"
            className="cursor-pointer text-blue-500 text-sm"
          >
            Escolher arquivo
          </label>
          <input
            type="file"
            name="arquivo"
            id="arquivo"
            onChange={handleFileChange}
            className="hidden"
            required
          />
          <span>{formData.arquivo ? formData.arquivo.name : "Nenhum arquivo selecionado"}</span>
        </div>

        <div className="mb-4">
          <p className="font-medium text-sm text-gray-700">Opções adicionais</p>
          <div className="grid grid-cols-2 gap-2">
            {opcoesDisponiveis.map((opcao) => (
              <div key={opcao} className="flex items-center">
                <input
                  type="checkbox"
                  id={opcao}
                  checked={formData.opcoes.includes(opcao)}
                  onChange={() => toggleOpcao(opcao)}
                  className="mr-2"
                />
                <label htmlFor={opcao}>{opcao}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg mt-4"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Form;
