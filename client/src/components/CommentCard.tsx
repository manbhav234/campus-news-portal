import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import parseDate from "../utils/parseDate"

interface CommentCardProp {
    content: string,
    author: string,
    createdAt: number
}

export default function CommentCard({content, author, createdAt}: CommentCardProp){
    return (
        <div className="border rounded-xl w-[80%] mx-auto mt-4 flex flex-col">
            <div className="flex justify-start gap-4 items-center mx-4 p-2">
                <div className="rounded-full bg-slate-50 w-12 h-12 flex justify-center items-center">
                    <FontAwesomeIcon icon={faUser} size="lg"/>
                </div>
                <div className="flex flex-col justify-center">
                    <span className="font-bold">{author}</span>
                    <span className="text-xs md:text-sm">Commented on : {parseDate(createdAt)}</span>
                </div>
            </div>
            <p className="mx-6 p-2 text-base md:text-lg">{content}</p>
        </div>
    )
}