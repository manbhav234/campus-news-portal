import { Link } from 'react-router-dom'
import GoogleLoginBtn from './GoogleLoginBtn'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function TopBar(){

    const [isMenuHidden, setMenuHidden] = useState(true)

    function toggleMenu(){
        setMenuHidden(!isMenuHidden)
    }

    const toggleMenuClassList = isMenuHidden ? 'hidden' : 'fixed bg-white inset-0'

    return (
        <nav className='border-b-[1px] border-slate-200 flex justify-between items-center'>
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
                    <Link to={'/all'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl'>All</Link>
                    <Link to={'/general'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl'>General</Link>
                    <Link to={'/notices'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl'>Notices</Link>
                    <Link to={'/events'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl'>Events</Link>
                    <Link to={'/clubs'} className='text-xl p-3 hover:font-bold hover:bg-gray-100 rounded-xl'>Clubs</Link>
                </div>
                <div className='h-[1px] w-[95%] mx-auto bg-gray-200 mt-2'></div>
                <div className='flex justify-center items-center'>
                    <GoogleLoginBtn/>
                </div>
            </div>
            <div className='hidden md:inline'>
                <GoogleLoginBtn/>
            </div>
           
        </nav>
    )
}