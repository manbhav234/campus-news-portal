import { useRecoilValueLoadable } from "recoil"
import { archivedArticlesSelector, currentUserArticlesAtom, publishedArticlesSelector } from "../store/atoms/currentUserArticles"
import { useNavigate } from "react-router-dom"
import CreateArticleBtn from "../components/CreateArticleBtn"
import Loader from "../components/Loader"
import ArticleCard from "../components/ArticleCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default function Dashboard(){
    const currentUserArticles = useRecoilValueLoadable(currentUserArticlesAtom)
    const publishedArticles = useRecoilValueLoadable(publishedArticlesSelector)
    const archivedArticles = useRecoilValueLoadable(archivedArticlesSelector)
    const navigate = useNavigate()

    switch (currentUserArticles.state){
        case 'hasValue':
            return (
                <div>
                    <div>
                        <h2 className="text-xl font-bold mt-4 ml-4 md:mt-8 md:ml-8 md:text-2xl text-center">Published Articles</h2>
                        {publishedArticles.state == 'hasValue' ? publishedArticles.contents.length == 0 ? <CreateArticleBtn/> :
                        <div className="mt-12 gap-x-2 gap-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto">
                            {publishedArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>)}
                        </div> : 
                        <div>
                            <Loader/>
                        </div>}
                    </div>
                    <div className="my-12">
                        <h2 className="text-xl font-bold m-4 md:m-8 md:text-2xl text-center">Archived Articles</h2>
                        {archivedArticles.state == 'hasValue' ? archivedArticles.contents.length == 0 ? <p className="text-center p-12 font-medium text-xl">No Archived Articles</p> :                    
                        <div className="mt-12 gap-x-2 gap-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto">
                            {archivedArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>)}
                        </div> : 
                        <div>
                            <Loader/>
                        </div>}
                    </div>
                    <div className={`fixed bottom-6 right-8 ${publishedArticles.contents.length == 0 ? 'hidden' : 'block'}`}>
                        <button type="button" className="rounded-full border border-sky-500 bg-sky-500 p-4 text-center text-lg font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 flex justify-center items-center" onClick={()=>navigate('/dashboard/create-article')}>
                            <FontAwesomeIcon icon={faPlus} size="lg" style={{color: "#ffffff",}} />
                        </button>
                    </div>
                </div>
            )
        case 'loading':
            return <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>
    }
}