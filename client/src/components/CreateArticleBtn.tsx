import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function CreateArticleBtn(){
    return (
        <div className="flex justify-center">
            <Link className="mt-12 border border-dashed p-4 border-black text-xl hover:bg-slate-100 rounded-lg" to={'/dashboard/create-article'}><FontAwesomeIcon icon={faPlus} className="pr-2"/> Create Your First Article</Link>
        </div>
    )
}