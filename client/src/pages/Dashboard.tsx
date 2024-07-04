import { useRecoilValue } from "recoil"
import { currentUserArticlesAtom } from "../store/atoms/currentUserArticles"
import CreateArticleBtn from "../components/CreateArticleBtn"

export default function Dashboard(){
    const currentUserArticles = useRecoilValue(currentUserArticlesAtom)
    return (
        <div>
            <h2 className="text-xl font-bold mt-4 ml-4 md:mt-8 md:ml-8 md:text-2xl">Created Articles</h2>
            {currentUserArticles.length == 0 ?<CreateArticleBtn/>: 
                <div>
                    have some articles
                </div>
            }
            <div className="mt-12">
                <h2 className="text-xl font-bold m-4 md:m-8 md:text-2xl">Archived Articles</h2>
            </div>
        </div>
    )
}