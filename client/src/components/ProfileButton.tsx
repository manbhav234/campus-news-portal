import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { loginAtom } from "../store/atoms/loginAtom"
import { currentUserAtom } from "../store/atoms/user"

export default function ProfileButton(){
    const [isOpen, setIsOpen] = useState(false)
    const setLogin = useSetRecoilState(loginAtom)
    const setCurrentUser = useSetRecoilState(currentUserAtom)

    const navigate = useNavigate()
    const handleLogout = async () => {
        const response = await axios.get('/auth/logout', {withCredentials: true})
        if (response.data.success){
            setLogin(false)
            navigate('/')
            setCurrentUser({username: 'Anonymous', googleId: '', _id: ''})
        }
    }

    const handleCloseOverlay  = ()=>{
        setIsOpen(false)
    }

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
                <Link to={'/dashboard'} className="p-3 text-lg hover:font-medium bg-slate-100 hover:bg-slate-200" onClick={handleCloseOverlay}>Dashboard</Link>
                <button className="p-3 text-lg hover:font-medium bg-slate-100 text-start hover:bg-slate-200" onClick={()=>{handleCloseOverlay();handleLogout()}}>Logout</button>
            </div>  
        </> : null}
        </>

    )
}