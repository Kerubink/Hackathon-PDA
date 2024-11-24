import Navbar from "../../components/header";
import FilterButton from "../../components/ButtonFilter/filterButton";
import Card from "../../components/Card/card"

export default function SearchAccommodation() {
    return (
        <>
            <Navbar />

            <div>
                <FilterButton />
            </div>

            <div>
                <Card />
            </div>

        </>
    )
}