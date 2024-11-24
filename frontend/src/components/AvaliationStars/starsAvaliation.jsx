import Stars from "../AvaliationStars/assets/star.png";

export default function StarsAvaliation({prop}) {
    return ( 
        <div className="flex items-center mr-2 mt-2">
            <img src={Stars} alt="icon star" className="w-[15px] h-[15px] mr-2" />
            <span className="text-xs font-medium">{prop}</span>
        </div>
    )
}