import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import parse from 'html-react-parser'
import '../CurrentArticle.css'
import EmojiPicker from 'emoji-picker-react'
import { Emoji } from "emoji-picker-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { EmojiType } from "../store/atoms/currentUserArticles"
import Loader from "../components/Loader"
import CommentSection from "../components/CommentSection"
import { useRecoilState } from "recoil"
import { selectedArticleAtom } from "../store/atoms/selectedArticle"

export default function CurrentArticle(){

    const {articleId} = useParams()
    const [currentArticle, setCurrentArticle] = useRecoilState(selectedArticleAtom)
    const [emojiTrayOpen, setEmojiTrayOpen] = useState(false)
    const [articleReactions, setArticleReactions] = useState([] as EmojiType[])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function fetchArticle(articleId: string){
            const response = await axios.get(`http://localhost:3000/api/articles/getArticle?id=${articleId}`)
            if (response.data.success){
                setCurrentArticle(response.data.article)
                setArticleReactions(response.data.article.reactions)
                setLoading(false)
            }
        }
        fetchArticle(articleId!)
    }, [])

    const handleEmojiClick = async (emojiObject: any) => {
        let found = false
        for (let i = 0; i < articleReactions.length; i++){
            if (articleReactions[i].emoji == emojiObject.unified){
                articleReactions[i].count++
                found = true
                break
            }
        }
        if (!found){
            setArticleReactions([...articleReactions, {emoji: emojiObject.unified, count: 1}])
        }
        setEmojiTrayOpen(false)
        const response = await axios.put(`http://localhost:3000/api/articles/updateReactions?id=${articleId}`, {
            reactions: articleReactions
        })
        console.log('reached here')
    } 

    return (
        <>   
        {loading ? 
        <div className="flex justify-center items-center h-screen w-screen">
            <Loader/>
        </div> :
        <div className="w-[95%] mx-auto flex flex-col justify-center border-x-2 shadow">
            <img src={`http://localhost:3000/articleImages/${currentArticle.articleImage}`} alt="Article Image" className="place-self-center w-[80%] rounded-2xl mt-12"/>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center mt-6 w-[75%] mx-auto">
                <p className="text-xl mb-6 font-semibold">Author : {currentArticle.author}</p>
                <span className="rounded-full bg-blue-50 px-4 py-2 text-lg font-semibold text-blue-600 text-center mb-4"> {currentArticle.category} </span>
            </div>
            <h1 className="text-3xl md:text-5xl text-center font-bold my-8">{currentArticle.title}</h1>
            <div className="post-content">
                {parse(currentArticle.content)}
            </div>
            <div className="mt-8 flex flex-col items-center border-b-2 mx-4">
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">Reactions</h2>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 place-items-center mt-4">
                    {articleReactions.length != 0 ? articleReactions.map((emoji)=> 
                        <div className="flex gap-2 items-center border p-2 rounded-xl">
                            <Emoji unified={emoji.emoji}/>
                            <span className="text-lg font-semibold">{emoji.count}</span>
                        </div>
                    ) : null}
                </div>
                <button className="border-2 p-2 rounded-full m-4" onClick={()=>setEmojiTrayOpen(!emojiTrayOpen)}><FontAwesomeIcon icon={faFaceSmile} size="2xl" style={{color: "#a3a3a3",}}/></button>
                <EmojiPicker open={emojiTrayOpen} onEmojiClick={handleEmojiClick} className="mb-4"/>
            </div>
            <CommentSection/>
        </div> 
        }
        </>
    )
}