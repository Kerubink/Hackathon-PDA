import StarsAvaliation from "../AvaliationStars/starsAvaliation";


export default function Card({ image, avaliation, name, category, handdleImageerror }) {
    return (
        <section className="p-[10px] rounded-[10px] w-full h-auto min-h-[280px] shadow-[0_4px_6px_rgba(0,0,0,0.4)] cursor-pointer hover:translate-y-0.5 transition-all">
            <div className="w-full h-auto overflow-hidden">
                <img src={image} alt="Imagem não disponivel" onError={handdleImageerror} className="w-full h-[150px] object-cover rounded-[10px] text-center" />

                <div className="flex justify-between items-center">
                    <h1 className="font-medium mt-3 text-sm">{name}</h1>
                    <StarsAvaliation prop={avaliation} />
                </div>

                <div className=" text-xs text-start p-1 rounded-[20px] mt-3 min-w-[60px] w-auto">
                    <i class="fa-solid fa-location-dot mr-2 text-[#CE4B4B]"></i>{category}
                </div>
            </div>
          
        </section>
    );
}
