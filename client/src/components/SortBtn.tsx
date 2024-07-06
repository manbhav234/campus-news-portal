import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import SortByCard from "./SortByCard"
import { useState } from "react"


export default function SortBtn({setSort, sort} : {setSort : React.Dispatch<React.SetStateAction<boolean>>, sort: boolean}){

    const [open, setOpen] = useState(false)
    return (
        <div className="flex flex-col items-center justify-center">
            <button className="text-center mt-6 border border-black mx-auto rounded-xl p-2 px-4 font-medium" onClick={()=>setOpen(!open)}>
                <div className="flex justify-center gap-2 items-center">
                    <span>Sort</span>
                    {open ? 
                    <FontAwesomeIcon icon={faCaretUp} style={{color: "#000000"}}/> 
                    : 
                    <FontAwesomeIcon icon={faCaretDown} style={{color: "#000000"}}/>
                    }
                </div>
            </button>
            <SortByCard status={open} sort={sort} setSort={setSort}/>
        </div>

    )
}