import { useRecoilValue } from "recoil"
import { currentUserAtom } from "../store/atoms/user"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faBoxArchive, faUpload } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

interface ArticleCardProp {
  title: string,
  content: string,
  category: string,
  articleImage: string,
  status: string,
  author: string
}


export default function ArticleCard({title, content, category, articleImage, status, author}: ArticleCardProp){

  const currentUser = useRecoilValue(currentUserAtom)
  const [activeDeleteModal, setActiveDeleteModal] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="mx-2 max-w-md overflow-hidden rounded-lg bg-white shadow">
      <img src={`http://localhost:3000/articleImages/${articleImage}`} className="aspect-video w-full object-cover" alt="article image" />
      <div className="p-4 hover:bg-slate-50 hover:cursor-pointer h-[100%]" onClick={()=>navigate('/dashboard')}>
        <p className="mb-1 text-sm text-primary-500">{author} • <time>18 Nov 2022</time></p>
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-500">{content}</p>
        <div className="mt-4 flex gap-2 justify-between items-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> {category} </span>
          {currentUser.username == 'Anonymous'? 
            <button type="button" className="rounded-lg border border-gray-700 bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 focus:ring focus:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300">Read More</button>
          : status == 'published' ?
            <div className="flex gap-1">
                <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500 bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-sky-700 hover:bg-sky-700 focus:ring focus:ring-sky-200 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300"><FontAwesomeIcon icon={faBoxArchive} size="sm" style={{color: "#ffffff",}} />Archive</button>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"><FontAwesomeIcon icon={faTrash} size="sm" style={{color: "#ffffff",}}/>Delete</button>
            </div> :
            <div className="flex gap-1">
              <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500 bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-sky-700 hover:bg-sky-700 focus:ring focus:ring-sky-200 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300"><FontAwesomeIcon icon={faUpload} size="sm" style={{color: "#ffffff",}} />Publish</button>
              <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"><FontAwesomeIcon icon={faTrash} size="sm" style={{color: "#ffffff",}} />Delete</button>
            </div> 
          }
        </div>
      </div>
    </div>
  )
}