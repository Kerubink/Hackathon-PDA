import image from "../Card/assets/o-hotel-fullerton.webp"

export default function Card() {
    return (
        <section className="bg-[] p-30">
            <div className="w-32 h-32">
                <img src={image} alt="" />
            </div>
        </section>
    )
}