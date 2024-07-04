import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function ProfileButton(){
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
        <button onClick={()=> {setIsOpen(!isOpen)}} className="hidden md:flex w-12 h-12 rounded-full bg-slate-100 mx-4 justify-center items-center">
            <div className="">
                <FontAwesomeIcon icon={faUser} size="xl" style={{color: "#666666",}}/>
            </div>
        </button>
        {isOpen ? <>
            <div className="hidden md:block fixed top-12 right-7">
                <FontAwesomeIcon icon={faCaretUp} size="2xl" style={{color: "#f1f5f9",}} />
            </div>
            <div className="hidden md:flex flex-col fixed right-2 top-16 rounded-xl w-48 bg-white shadow-md">
                <Link to={'/dashboard'} className="p-3 text-lg hover:font-medium bg-slate-100 hover:bg-slate-200">Dashboard</Link>
                <button className="p-3 text-lg hover:font-medium bg-slate-100 text-start hover:bg-slate-200">Logout</button>
            </div>  
        </> : null}
        </>

    )
}