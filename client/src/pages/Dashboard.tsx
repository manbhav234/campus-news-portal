import { useRecoilValueLoadable } from "recoil"
import { archivedArticlesSelector, currentUserArticlesAtom, publishedArticlesSelector } from "../store/atoms/currentUserArticles"
import { useNavigate } from "react-router-dom"
import CreateArticleBtn from "../components/CreateArticleBtn"
import Loader from "../components/Loader"
import ArticleCard from "../components/ArticleCard"

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
                        <h2 className="text-xl font-bold mt-4 ml-4 md:mt-8 md:ml-8 md:text-2xl">Created Articles</h2>
                        {publishedArticles.state == 'hasValue' ? publishedArticles.contents.length == 0 ? <CreateArticleBtn/> :
                        <div className="mt-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            {publishedArticles.contents.map((article)=><ArticleCard title={article.title} content={article.content} category={article.category} articleImage={article.articleImage}/>)}
                        </div> : 
                        <div>
                            <Loader/>
                        </div>}
                    </div>
                    <div className="mt-12">
                        <h2 className="text-xl font-bold m-4 md:m-8 md:text-2xl">Archived Articles</h2>
                        {archivedArticles.state == 'hasValue' ? archivedArticles.contents.length == 0 ? <p>no archived articles</p> :                    
                        <div className="mt-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            {archivedArticles.contents.map((article)=><ArticleCard title={article.title} content={article.content} category={article.category} articleImage={article.articleImage}/>)}
                        </div> : 
                        <div>
                            <Loader/>
                        </div>}
                    </div>
                    <div className="fixed bottom-4 right-4 flex justify-center items-center">
                        <button type="button" className="rounded-full border border-sky-500 bg-sky-500 p-4 text-center text-lg font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300" onClick={()=>navigate('/dashboard/create-article')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-7 w-7">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )
        case 'loading':
            return <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>
    }
}