import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export default function Modal({open, onClose, children}: {open: boolean, onClose: ()=>void, children: React.ReactNode}){
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20': 'invisible'}`}>
            <div className={`bg-white rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100': 'scale-125 opacity-0'}`} onClick={(e)=> e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg">
                    <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#000000",}} />
                </button>
                {children}
            </div>
        </div>
    )
}