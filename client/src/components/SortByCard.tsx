export default function SortByCard({status, sort, setSort} : {status: boolean, sort: boolean, setSort: React.Dispatch<React.SetStateAction<boolean>>}){

    return (
        <div className={`bg-white ${status ? 'flex': 'hidden'} flex-col items-center my-4 border rounded-xl shadow-lg`}>
            <button className="text-lg font-medium border-b w-[100%] p-2 px-4 hover:bg-slate-50">By Popularity</button>
            <button className= "text-lg font-medium w-[100%] p-2 px-4 hover:bg-slate-50" onClick={()=>setSort(!sort)}>By Date Latest</button>
        </div>
    )
}