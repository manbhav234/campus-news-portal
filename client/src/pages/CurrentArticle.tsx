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
            const response = await axios.get(`/api/articles/getArticle?id=${articleId}`)
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
        let updatedArticleReactions;
        for (let i = 0; i < articleReactions.length; i++){
            if (articleReactions[i].emoji == emojiObject.unified){
                found = true
                const newCount = articleReactions[i].count + 1
                updatedArticleReactions = articleReactions.map((reaction, index)=> index == i ? {...reaction, count: newCount} : reaction)
                setArticleReactions(updatedArticleReactions)
                break;
            }
        
        }
        if (!found){
            updatedArticleReactions = [...articleReactions, {...emojiObject, emoji: emojiObject.unified, count: 1}]
            setArticleReactions(updatedArticleReactions)
        }
        axios.put(`/api/articles/updateReactions?id=${articleId}`, {
            reactions: updatedArticleReactions
        })
    } 

    return (
        <>   
        {loading ? 
        <div className="flex justify-center items-center h-screen w-screen">
            <Loader/>
        </div> :
        <div className="w-[85%] mx-auto flex flex-col justify-center border-x-2 shadow">
            <img src={`/articleImages/${currentArticle.articleImage}`} alt="Article Image" className="place-self-center w-[70%] rounded-2xl mt-12"/>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center mt-6 w-[68%] mx-auto">
                <p className="text-xl mb-6 font-semibold">Author : {currentArticle.author.username}</p>
                <span className="rounded-full bg-blue-50 px-4 py-2 text-base md:text-lg font-semibold text-blue-600 text-center mb-4"> {currentArticle.category} </span>
            </div>
            <h1 className="text-3xl md:text-5xl text-center font-bold my-8">{currentArticle.title}</h1>
            <div className="post-content w-[80%] mx-auto">
                {parse(currentArticle.content)}
            </div>
            <div className="mt-8 pt-6 flex flex-col items-center border-y-2 mx-4">
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">Reactions</h2>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 place-items-center mt-4">
                    {articleReactions.length != 0 ? articleReactions.map((emoji)=> 
                        <div className="flex gap-2 items-center border p-2 rounded-xl">
                            <Emoji key={emoji._id} unified={emoji.emoji}/>
                            <span className="text-lg font-semibold">{emoji.count}</span>
                        </div>
                    ) : null}
                </div>
                <button className="border-2 p-2 rounded-full mt-12 mb-4" onClick={()=>setEmojiTrayOpen(!emojiTrayOpen)}><FontAwesomeIcon icon={faFaceSmile} size="2xl" style={{color: "#a3a3a3",}}/></button>
                <EmojiPicker open={emojiTrayOpen} onEmojiClick={handleEmojiClick} className="mb-4"/>
            </div>
            <CommentSection/>
        </div> 
        }
        </>
    )
}