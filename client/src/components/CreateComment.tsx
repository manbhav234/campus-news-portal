import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentUserAtom } from "../store/atoms/user"
import { loadedCommentsAtom, selectedArticleAtom } from "../store/atoms/selectedArticle"
import { Comment } from "../store/atoms/currentUserArticles"
import axios from "axios"

export default function CreateComment(){

    const [content, setContent] = useState('')
    const author = useRecoilValue(currentUserAtom)
    const selectedArticle = useRecoilValue(selectedArticleAtom)
    const [loadedComments, setLoadedComments] = useRecoilState(loadedCommentsAtom)

    const handleOnChange = (e : any)=>{
        setContent(e.target.value)
    }

    const handleSubmit = async () => {
       const comment : Comment = {
            author: author.username,
            articleId: selectedArticle._id,
            content: content,
            createdAt: Date.now()
       }
       const response = await axios.post('/api/comments/create', {
        comment: comment
       })
       setLoadedComments([response.data.latestComment,...loadedComments])
       console.log('reached here')
    }

    return (
        <div className="w-[85%] mx-auto mt-8 mb-6">
            <h3 className="text-xl md:text-2xl font-bold p-2">Comment</h3>
            <div className="relative mt-6 px-2">
                <div className="relative w-full min-w-[200px]">
                    <textarea rows={5} className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm md:text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" placeholder="" onChange={(e)=>handleOnChange(e)}></textarea>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">Your Comment</label>
                </div>
                <div className="flex w-full justify-between py-1.5">
                    <div className="flex gap-2">
                        <button className="select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={handleSubmit}>Post Comment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}