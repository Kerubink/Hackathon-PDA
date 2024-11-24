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

            <div className="flex flex-wrap justify-center items-center space-y-6 mt-10 md:space-y-0 md:space-x-6 p-4">
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