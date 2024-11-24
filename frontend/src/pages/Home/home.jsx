import Header from "../../components/header"
import imgPhone from "../../assets/Design_phone.png"
import imgBckg from "../../assets/bckg.png"

import '../../style/media-home.css'

export default function Home() {
    return (
        <>
            <Header />
            <div className="h-screen relative overflow-hidden flex flex-col justify-center items-center m-0 px-2 md:flex-row">
                <div className="z-20 md:ml-[200px]">
                    <h3 className="text-[26px] m-0 font-semibold text-[#192A3D] 2xl:text-[40px] xl:leading-[50px] font-bold xl:max-w-[60%]">
                        Encontre hotéis, pousadas e resorts com facilidade, porque
                        <span className="text-[#009EF9]"> a hospitalidade do anfitrião começa na sua busca.</span>
                    </h3>
                    <div>
                        <button className="py-2 px-10 bg-[#009EF9] text-[#fff] font-bold mt-3 rounded-[3px] text-[18px] shadow-md hover:scale-95 md:text-[25px]">
                            Buscar
                        </button>
                    </div>
                </div>
                <img className="w-[95%] z-10 animate-float md:w-[40%]" src={imgPhone} />
                <img className="absolute z-0 bottom-[-30px] rotate-[-55deg] scale-150 right-[-110px] md:right-[-800px] md:rotate-[-140deg] xl:top-0 xl:scale-100 xl:rotate-[-160deg] xl:top-[-480px] xl:right-[-1300px] imgbckg" src={imgBckg} />
            </div>


        </>


    )
}