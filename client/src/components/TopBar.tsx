import { Link } from 'react-router-dom'
import GoogleLoginBtn from './GoogleLoginBtn'
import ProfileButton from './ProfileButton'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { currentUserAtom } from '../store/atoms/user'

export default function TopBar(){

    const [isMenuHidden, setMenuHidden] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const setCurrentUser = useSetRecoilState(currentUserAtom)

    async function checkLogin(){
        const response = await axios.get('/api/user/authenticate', {withCredentials: true})
        if (response.data.success){
            setCurrentUser(response.data.user)
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }    
    }

    useEffect(()=>{
        checkLogin()
    }, [])

    function toggleMenu(){
        setMenuHidden(!isMenuHidden)
    }
    console.log(isLoggedIn)
    const toggleMenuClassList = isMenuHidden ? 'hidden' : 'fixed bg-white inset-0 md:hidden'

    return (
        <nav className='border-b-[1px] bg-white border-slate-200 flex justify-between items-center sticky top-0'>

            <Link className='m-6 text-xl font-bold' to={'/'}>BITS Goa News Portal</Link>

            <div className='mx-4 md:hidden'>
                <button onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} size='xl'/>
                </button>
            </div>

            <div className='hidden md:flex space-x-8'>
                <Link to={'/all'} className='text-xl hover:font-bold'>All</Link>
                <Link to={'/general'} className='text-xl hover:font-bold'>General</Link>
                <Link to={'/notices'} className='text-xl hover:font-bold'>Notices</Link>
                <Link to={'/events'} className='text-xl hover:font-bold'>Events</Link>
                <Link to={'/clubs'} className='text-xl hover:font-bold'>Clubs</Link>
            </div>

            <div className={toggleMenuClassList}>
                <div className='flex justify-between items-center'>
                    <Link className='m-6 text-xl font-bold' to={'/'}>BITS Goa News Portal</Link>
                    <div className='mx-4 md:hidden'>
                        <button className='text-black' onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faXmark} size='xl'/>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col mx-6 space-y-2'>
                    <Link to={'/all'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl' onClick={toggleMenu}>All</Link>
                    <Link to={'/general'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl' onClick={toggleMenu}>General</Link>
                    <Link to={'/notices'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl' onClick={toggleMenu}>Notices</Link>
                    <Link to={'/events'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl' onClick={toggleMenu}>Events</Link>
                    <Link to={'/clubs'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl' onClick={toggleMenu}>Clubs</Link>
                </div>
                <div className='h-[1px] w-[95%] mx-auto bg-gray-200 mt-2'></div>
                {isLoggedIn ? 
                <div className='flex flex-col mx-6 space-y-2 mt-2'>
                    <Link to={'/dashboard'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl' onClick={toggleMenu}>Dashboard</Link>
                    <button className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl text-start' onClick={()=>{toggleMenu()}}>Logout</button>
                </div> :
                <div className='flex justify-center items-center'>
                    <GoogleLoginBtn/>
                </div>                
                }
            </div>
            {isLoggedIn ? <ProfileButton/> : <div className='hidden md:inline'><GoogleLoginBtn/></div>}
        </nav>
    )
}