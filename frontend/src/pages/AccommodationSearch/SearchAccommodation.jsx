import Navbar from "../../components/header";
import FilterButton from "../../components/ButtonFilter/filterButton";
import Card from "../../components/Card/card";
import image from "../../components/Card/assets/o-hotel-fullerton.webp";

export default function SearchAccommodation() {
    return (
        <>
            <Navbar />

            <div>
                <FilterButton />
            </div>

            <div className="flex flex-col justify-center items-center h-screen space-y-3 mt-10 md:flex-row items-baseline space-x-10">
                <div>
                    <Card 
                        image={image}
                        name={"Copacabana"}
                        avaliation={"0,5"}
                        category={"Hotel"}
                    />
                </div>

                <div>
                    <Card 
                        image={image}
                        name={"Copacabana"}
                        avaliation={"0,5"}
                        category={"Hotel"}
                    />
                </div>
            </div>
        </>
    )
}