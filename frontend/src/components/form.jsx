import React, { useState, useEffect } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cep: "",
    uf: "",
    pais: "Brasil", // Padrão Brasil
    cidade: "",
    bairro: "",
    descricao: "",
    arquivo: null,
    longitude: "",
    latitude: "",
    opcoes: [],
  });

  const [cepError, setCepError] = useState(""); // Mensagem de erro para CEP
  const [loadingCep, setLoadingCep] = useState(false); // Estado para mostrar carregamento

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

        // Verifica se o CEP retornou erro
        if (data.errors) {
          setCepError("CEP inválido ou não encontrado.");
          setLoadingCep(false);
          return;
        }

        // Atualiza os campos automaticamente com os dados retornados
        setFormData((prevState) => ({
          ...prevState,
          bairro: data.neighborhood || "",
          cidade: data.city || "",
          uf: data.state || "",
        }));
        setCepError(""); // Limpa erros
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificação de campos obrigatórios
    if (!formData.nome || !formData.cep || !formData.uf || !formData.cidade || !formData.bairro || !formData.descricao || !formData.arquivo || formData.opcoes.length === 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (cepError) {
      alert("Preencha o CEP corretamente antes de enviar.");
      return;
    }

    console.log(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
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
            className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-[#009EF9] hover:bg-[#009EF9] hover:text-white transition"
          >
            <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
            <input
              type="file"
              name="arquivo"
              id="arquivo"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
          <span className="text-gray-500">
            {formData.arquivo ? formData.arquivo.name : "Nenhum arquivo selecionado"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {opcoesDisponiveis.map((opcao) => (
            <button
              type="button"
              key={opcao}
              onClick={() => toggleOpcao(opcao)}
              className={`px-4 py-2 rounded-lg border ${
                formData.opcoes.includes(opcao)
                  ? "bg-[#009EF9] text-white"
                  : "bg-gray-200 text-[#009EF9]"
              } hover:bg-[#009EF9] hover:text-white transition`}
            >
              {opcao}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-[#009EF9] text-white font-semibold p-3 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Form;
