import { useState } from "react"
import { useParams } from "react-router-dom"
import parse from 'html-react-parser'
import '../CurrentArticle.css'
import findArticle from "../utils/findArticle"
import EmojiPicker from 'emoji-picker-react'
import {Emoji} from 'emoji-picker-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons"

export default function CurrentArticle(){

    const {articleId} = useParams()
    const [currentArticle, setCurrentArticle] = useState(findArticle(articleId!))
    const [emojiTrayOpen, setEmojiTrayOpen] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState('')

    const handleEmojiClick = (emojiObject: any) => {
        setSelectedEmoji(emojiObject.unified)
        setEmojiTrayOpen(false)
    }

    return (
        <>   
        <div className="w-[80%] mx-auto flex flex-col justify-center border-x-2 shadow mb-48">
            <h1 className="text-4xl md:text-5xl text-center font-bold my-8">{currentArticle.title}</h1>
            <p className="place-self-center text-xl mb-6 font-semibold">Author : {currentArticle.author}</p>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-lg font-semibold text-blue-600 text-center place-self-center mb-4"> {currentArticle.category} </span>
            <img src={`http://localhost:3000/articleImages/${currentArticle.articleImage}`} alt="Article Image" className="place-self-center w-[80%]"/>
            <div className="post-content">
                {parse(currentArticle.content)}
            </div>
            {/* <div className="mt-8 flex flex-col items-center">
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">Reactions</h2>
                <Emoji unified={selectedEmoji}/>
                <button className="border-2 p-2 rounded-full m-4"><FontAwesomeIcon icon={faFaceSmile} size="2xl" style={{color: "#a3a3a3",}} onClick={()=>setEmojiTrayOpen(!emojiTrayOpen)}/></button>
                <EmojiPicker open={emojiTrayOpen} onEmojiClick={handleEmojiClick}/>
            </div> */}
        </div> 
        </>
    )
}