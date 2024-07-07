import { useRecoilValueLoadable } from "recoil";
import CommentCard from "./CommentCard";
import CreateComment from "./CreateComment";
import { loadedCommentsAtom } from "../store/atoms/selectedArticle";
import Loader from "./Loader";

export default function CommentSection(){
    const loadedComments = useRecoilValueLoadable(loadedCommentsAtom)

    switch(loadedComments.state){
        case 'hasValue':
            return (
                <>
                    <div className="mt-6 mb-4">
                        <h2 className="font-bold text-2xl md:text-3xl text-center">{loadedComments.contents.length} Comments</h2>
                    </div>
                    {loadedComments.contents.length != 0 ? 
                    <div>
                        <div className="h-[80vh] overflow-y-auto">
                            {loadedComments.contents.map((comment)=><CommentCard key={comment._id} author={comment.author} createdAt={comment.createdAt} content={comment.content}/>)}
                        </div>
                        <CreateComment/>
                    </div>

                    : <CreateComment/>}
                </>                
            )
        case 'loading':
            return (
                <div className="flex justify-center items-center m-8">
                    <Loader/>
                </div>
            )
    }
}