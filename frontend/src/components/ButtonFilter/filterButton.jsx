import React, { useState } from "react";
import IconFilter from "./assets/icon-filter.png"; // Certifique-se de ajustar o caminho do ícone

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Alternar o estado do dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Fechar o dropdown ao clicar fora
  const closeDropdown = (e) => {
    if (!e.target.closest("#dropdown-menu") && !e.target.closest("#filter-button")) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <section className="">
      {/* Botão "Filtrar" */}
      <div
        id="filter-button"
        className="bg-[#009EF9] flex items-center rounded-[5px] p-2 w-32 h-9 shadow-md cursor-pointer hover:scale-[98%]"
        onClick={toggleDropdown}
      >
        <div className="size-5 ml-2 mr-5">
          <img src={IconFilter} alt="icon filter" />
        </div>

        <div>
          <p className="text-white">Filtrar</p>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          id="dropdown-menu"
          className="absolute mt-2 right-30 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
        >
          {/* Categorias */}
          <div className="py-2 border-b border-gray-200">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="fa-solid fa-hotel text-[#009EF9]"></i>Hotéis
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i class="fa-solid fa-bed text-[#009EF9]"></i>Pousadas
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i class="fa-solid fa-bed text-[#009EF9]"></i>Resorts
            </a>
          </div>

          {/* Filtros */}
          <div className="py-2">
            <label className="flex items-center px-4 py-1 gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              Menor preço
            </label>
            <label className="flex items-center px-4 py-1 gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              Maior preço
            </label>
            <label className="flex items-center px-4 py-1 gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              Wifi
            </label>
            <label className="flex items-center px-4 py-1 gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              Café da manhã
            </label>
          </div>
        </div>
      )}
    </section>
  );
};


export default FilterButton;