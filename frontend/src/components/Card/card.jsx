import StarsAvaliation from "../AvaliationStars/starsAvaliation";

export default function Card({image, avaliation, name, category}) {
    return (
        <section className=" p-[10px] rounded-[10px] w-[240px] h-94 shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
            <div className="ow-full h-full overflow-hidden">
                <img src={image} alt="" className="h-30 object-cover rounded-[10px]" />

                <div className="flex justify-between">
                    <h1 className="font-medium mt-3">{name}</h1>
                    <StarsAvaliation prop={avaliation} />
                </div>

                <div className="bg-[#D9D9D9] text-xs text-center p-1 w-[60px] rounded-[20px] mt-3"> 
                    {category}
                </div>
            </div>
        </section>
    )
}