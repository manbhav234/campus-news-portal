import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faBoxArchive, faUpload } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import Modal from "./Modal"
import axios from "axios"
import parseDate from "../utils/parseDate"
import { useRecoilStateLoadable, useSetRecoilState } from "recoil"
import { Article, currentUserArticlesAtom } from "../store/atoms/currentUserArticles"
import 'react-toastify/dist/ReactToastify.css';
import { allArticlesAtom } from "../store/atoms/allArticles"

interface ArticleCardProp {
  id: string,
  title: string,
  content: string,
  category: string,
  articleImage: string,
  status: string,
  author: string,
  createdAt: number
}


export default function ArticleCard({id, title, content, category, articleImage, status, author, createdAt}: ArticleCardProp){

  const location = useLocation()
  const [activeModal, setActiveModal] = useState(false)
  const [clickedArticle, setClickedArticle] = useState('')
  const [modalType, setModalType] = useState('')
  const navigate = useNavigate()

  const [currentArticles, setCurrentArticles] = useRecoilStateLoadable(currentUserArticlesAtom)
  const setDisplayArticles = useSetRecoilState(allArticlesAtom)

  const handleDelete = async (id: string)=>{
    const response = await axios.delete(`/api/articles/delete?id=${id}`)
    if (response.data.success){
      setCurrentArticles(currentArticles.contents.filter((article : Article)=>article._id !== id))
      setDisplayArticles(currentArticles.contents.filter((article : Article)=>article._id !== id))
    }
  }

  const handlePublish = async (id: string)=>{
    const response = await axios.put(`/api/articles/publish?id=${id}`)
    if (response.data.success){
      setCurrentArticles(currentArticles.contents.map((article : Article)=>article._id == id ? {...article, status: 'published'}: article))
      setDisplayArticles([...currentArticles.contents])
    }
  }

  const handleArchive = async (id: string)=>{
    const response = await axios.put(`/api/articles/archive?id=${id}`)
    if (response.data.success){
      setCurrentArticles(currentArticles.contents.map((article : Article)=>article._id == id ? {...article, status: 'archived'}: article))
      setDisplayArticles(currentArticles.contents.filter((article : Article)=>article._id !== id))
    }
  }


  return (
    <>
    <div className="mx-2 max-w-md overflow-hidden rounded-lg bg-white shadow">
      <img src={`/articleImages/${articleImage}`} className="aspect-video w-full object-cover" alt="article image" />
      <div className={`p-4 h-[100%] ${location.pathname == '/dashboard' ? 'hover:bg-slate-50 hover:cursor-pointer': 'hover:cursor-pointer'}`} onClick={()=>{location.pathname == '/dashboard' ? navigate('/dashboard'): null}}>
        <p className="mb-1 text-sm text-primary-500">{author} • <time>{parseDate(createdAt)}</time></p>
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
        {/* <p className="mt-1 text-gray-500">{content}</p> */}
        <div className="mt-4 flex gap-2 justify-between items-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> {category} </span>
          {location.pathname != '/dashboard'? 
            <button type="button" className="rounded-lg border border-gray-700 bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 focus:ring focus:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300" onClick={() => navigate(`/article/${id}`)}>Read</button>
          : status == 'published' ?
            <div className="flex gap-1">
                <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500 bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-sky-700 hover:bg-sky-700 focus:ring focus:ring-sky-200 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300" onClick={()=>{setActiveModal(true); setModalType('Archived'); setClickedArticle(id)}}><FontAwesomeIcon icon={faBoxArchive} size="sm" style={{color: "#ffffff",}} />Archive</button>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300" onClick={()=>{setActiveModal(true);setModalType('Delete'); setClickedArticle(id)}}><FontAwesomeIcon icon={faTrash} size="sm" style={{color: "#ffffff",}}/>Delete</button>
            </div> :
            <div className="flex gap-1">
              <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500 bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-sky-700 hover:bg-sky-700 focus:ring focus:ring-sky-200 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300" onClick={()=>{setActiveModal(true); setModalType('Published'); setClickedArticle(id)}}><FontAwesomeIcon icon={faUpload} size="sm" style={{color: "#ffffff",}} />Publish</button>
              <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300" onClick={()=>{setActiveModal(true); setModalType('Delete'); setClickedArticle(id)}}><FontAwesomeIcon icon={faTrash} size="sm" style={{color: "#ffffff",}}/>Delete</button>
            </div> 
          }
        </div>
      </div>
      <Modal open={activeModal} onClose={()=>setActiveModal(false)}>
        {modalType == 'Delete' ?
          <div className="flex flex-col items-center w-56">
            <FontAwesomeIcon icon={faTrash} size="2xl" style={{color: "#ef4444",}}/>
            <div className="flex flex-col items-center my-4 w-48 gap-3">
              <h1 className="font-bold text-xl text-center">Confirm Delete</h1>
              <p className="text-gray-500 text-center text-lg mb-4">Are you sure you want to delete this item ?</p>
              <div className="flex gap-4">
                <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"onClick={()=>{handleDelete(clickedArticle); setActiveModal(false);}}><FontAwesomeIcon icon={faTrash} size="sm" style={{color: "#ffffff",}}/>Delete</button>
                <button type="button" className="rounded-lg border border-gray-700 bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 focus:ring focus:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300" onClick={()=>setActiveModal(false)}>Cancel</button>
              </div>
            </div> 
          </div>
          
          : modalType == 'Published' ?
            <div className="flex flex-col items-center w-56">
              <FontAwesomeIcon icon={faUpload} size="2xl" style={{color: "#0ea5e9",}} /> 
              <div className="flex flex-col items-center my-4 w-48 gap-3">
                <h1 className="font-bold text-xl text-center">Confirm Publish</h1>
                <p className="text-gray-500 text-center text-lg mb-4">Are you sure you want to publish this item ?</p>
                <div className="flex gap-4">
                  <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500 bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-sky-700 hover:bg-sky-700 focus:ring focus:ring-sky-200 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300" onClick={()=>{handlePublish(clickedArticle);setActiveModal(false)}}><FontAwesomeIcon icon={faUpload} size="sm" style={{color: "#ffffff",}} />Publish</button>
                  <button type="button" className="rounded-lg border border-gray-700 bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 focus:ring focus:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300" onClick={()=>setActiveModal(false)}>Cancel</button>
                </div>
              </div> 
            </div>
          :
          <div className="flex flex-col items-center w-56">
            <FontAwesomeIcon icon={faBoxArchive} size="2xl" style={{color: "#0ea5e9",}} /> 
            <div className="flex flex-col items-center my-4 w-48 gap-3">
              <h1 className="font-bold text-xl text-center">Confirm Archive</h1>
              <p className="text-gray-500 text-center text-lg mb-4">Are you sure you want to archive this item ?</p>
              <div className="flex gap-4">
                <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500 bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-sky-700 hover:bg-sky-700 focus:ring focus:ring-sky-200 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300" onClick={()=>{handleArchive(clickedArticle);setActiveModal(false)}}><FontAwesomeIcon icon={faBoxArchive} size="sm" style={{color: "#ffffff",}} />Archive</button>
                <button type="button" className="rounded-lg border border-gray-700 bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 focus:ring focus:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300" onClick={()=>setActiveModal(false)}>Cancel</button>
              </div>
            </div> 
          </div>
        }
      </Modal>
    </div>
    </>

  )
}