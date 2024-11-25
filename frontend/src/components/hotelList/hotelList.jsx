    import React, { useEffect, useState } from "react";
    import Card from "../Card/card";

    import defaultImage from "../../assets/404.png"

    export default function HotelList() {
        const [hotels, setHotels] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch("https://hackathon-pda.onrender.com/api");
                const data = await response.json();
                setHotels(data);
            };

            fetchData();
        }, []);

        
        const handleImageError = (event) => {
            event.target.src = defaultImage;
        };

        return (
            <div className="grid grid-cols-2 w-[90%]   mt-10  gap-4  place-items-center  m-auto md:grid-cols-4 xl:w-[80%] 2xl:grid-cols-6 gap-x-3 ">
                {hotels.map((hotel) => (
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
        );
    }