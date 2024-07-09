export default function SortByCard({status, sort, setSort} : {status: boolean, sort: string, setSort: React.Dispatch<React.SetStateAction<string>>}){

    return (
        <div className={`bg-white ${status ? 'flex': 'hidden'} flex-col items-center my-4 border rounded-xl shadow-lg`}>
            <button className="text-lg font-medium border-b w-[100%] p-2 px-4 hover:bg-slate-50" onClick={()=>setSort('popular')}>By Popularity</button>
            <button className= "text-lg font-medium w-[100%] p-2 px-4 hover:bg-slate-50" onClick={()=>setSort('latest')}>By Date Latest</button>
        </div>
    )
}