import IconFilter from "../ButtonFilter/assets/icon-filter.png";

export default function FilterButton() {
    return (
        <section className="flex justify-end mt-10 mr-5 p-1">
            <div className="bg-[#009EF9] flex items-center rounded-[10px] p-2 w-32 h-9">
                <div className="size-5 ml-2  mr-5">
                    <img src={IconFilter} alt="icon filter" />  
                </div>

                <div>
                    <p className="text-white">filtrar</p>
                </div>
            </div>
        </section>
    )
}