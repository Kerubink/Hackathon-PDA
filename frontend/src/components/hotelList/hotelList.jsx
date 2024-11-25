import React, { useEffect, useState } from "react";
import Card from "../Card/card";
import defaultImage from "../../assets/404.png";

export default function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://hackathon-pda.onrender.com/api");
            const data = await response.json();
            setHotels(data);
            setLoading(false);
        };

        fetchData();
    }, []);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center mt-10">
                <i className="fa-solid fa-spinner animate-spin text-[#009EF9]"></i>
                <p className="ml-2">Carregando hospedagens...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-2 w-[90%] mt-10 gap-4 place-items-center m-auto md:grid-cols-4 xl:w-[80%] 2xl:grid-cols-6 gap-x-3">
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

            {/* Paginação */}
            <nav aria-label="Page navigation example" className="mt-6 flex justify-center">
                <ul className="flex space-x-2">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 text-sm font-medium rounded-md border ${
                                currentPage === 1
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
                                className={`px-4 py-2 text-sm font-medium rounded-md border ${
                                    currentPage === index + 1
                                        ? "text-white bg-blue-600 border-blue-600"
                                        : "text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-800 border-gray-300"
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
                            className={`px-4 py-2 text-sm font-medium rounded-md border ${
                                currentPage === totalPages
                                    ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                    : "text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-800 border-gray-300"
                            }`}
                        >
                            Próximo
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
