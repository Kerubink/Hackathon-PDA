import Header from "../../components/header/header";
import FilterButton from "../../components/ButtonFilter/filterButton";
import RegisterButton from "../../components/buttonRegister/registerButton";
import HotelList from "../../components/hotelList/hotelList"
import Card from "../../components/Card/card";
import image from "../../components/Card/assets/teste.jpg";

export default function SearchAccommodation() {
    return (
        <>
            <Header />

            <div className="flex w-full items-center justify-end py-6 gap-5">
                <FilterButton />
                <RegisterButton />
            </div>
            <HotelList />
       
        </>
    )
}