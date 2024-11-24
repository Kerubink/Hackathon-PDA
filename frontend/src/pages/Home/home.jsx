import Header from "../../components/header"
import imgPhone from "../../assets/Design_phone.png"
import imgBckg from "../../assets/bckg.png"

export default function Home() {
    return (
        <>
            <Header />
            <div className="h-screen relative overflow-hidden flex flex-col justify-center items-center m-0 px-2 md:flex-row">
                <div className="z-20 md: ml-[200px]">
                    <h3 className="text-[26px] m-0 font-semibold text-[#192A3D] m-0 md:text-[40px] leading-[50px] font-bold max-w-[60%] ">Encontre hotéis, pousadas e resorts com facilidade, porque  <span className="text-[#009EF9]">a hospitalidade do anfitrião começa na sua busca.</span></h3>
                    <div>
                        <button className="py-2 px-10 bg-[#009EF9] text-[#fff] font-bold mt-3 rounded-[3px] text-[18px] md: text-[25px]">Buscar</button>
                    </div>
                </div>
                <img className="w-[95%] z-10 md:w-[40%]" src={imgPhone} />
                <img className="absolute z-0 bottom-[-30px] rotate-[-55deg] scale-150 right-[-110px] md: top-0 scale-100 rotate-[-160deg] top-[-480px] right-[-1300px]" src={imgBckg}/>
            </div>

        </>


    )
}