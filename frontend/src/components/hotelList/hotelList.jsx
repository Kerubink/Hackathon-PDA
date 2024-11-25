import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card/card";
import defaultImage from "../../assets/404.png";

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filter = params.get("filter");
        setKeyword(filter || "");

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://hackathon-pda.onrender.com/api?keyword=${filter || ""}`
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHotels = hotels.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(hotels.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                <>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 2xl:grid-cols-6 gap-x-3">
                        {currentHotels.map((hotel) => (
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

                    <nav
                        aria-label="Page navigation example"
                        className="mt-6 flex justify-center"
                    >
                        <ul className="flex space-x-2">
                            <li>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 text-sm font-medium rounded-md border ${currentPage === 1
                                            ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                            : "text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-800 border-gray-300"
                                        }`}
                                >
                                    Anterior
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index + 1}>
                                    <button
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 text-sm font-medium rounded-md border ${currentPage === index + 1
                                                ? "text-white"
                                                : "text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-800 border-gray-300"
                                            } ${currentPage === index + 1
                                                ? "bg-[#009EF9] border-[#009EF9]"
                                                : ""
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 text-sm font-medium rounded-md border ${currentPage === totalPages
                                            ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                            : "text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-800 border-gray-300"
                                        }`}
                                >
                                    Próximo
                                </button>
                            </li>
                        </ul>
                    </nav>

                </>
            )}
        </div>
    );
};

export default HotelList;
