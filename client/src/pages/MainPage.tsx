import { useRecoilValueLoadable } from "recoil"
import { latestAllArticlesSelector } from "../store/atoms/latestArticles"
import ArticleCard from "../components/ArticleCard"
import { popularAllArticleSelector } from "../store/atoms/popularArticles"

export default function MainPage(){

    const latestArticles = useRecoilValueLoadable(latestAllArticlesSelector)
    const popularArticles = useRecoilValueLoadable(popularAllArticleSelector)

    return (
        <>
            <div className="relative">
                <img src="/public/Bdome.jpg" alt="" className=""/>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 flex flex-col gap-7 justify-center items-center">
                    <h1 className="text-white font-bold text-3xl md:text-5xl">BITS Goa News Portal</h1>
                    <p className="text-white font-semibold text-lg md:text-2xl">Your Source For All Things Campus</p>             
                </div>
            </div>
            {latestArticles.state == 'hasValue' ? 
            <>
                <h2 className="font-bold text-3xl text-center mt-8 mb-4">Latest News</h2>
                {latestArticles.contents.length == 0 ? <p className="text-center text-xl font-semibold mt-8">No Articles To Show !</p> :
                <div className="w-[80%] mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"> 
                    {latestArticles.contents.map((article, index)=> index <= 3 ? <ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/> : null)}
                </div> 
                }
            </> : 
            null
            }
            {popularArticles.state == 'hasValue' ? 
            <>
                <h2 className="font-bold text-3xl text-center mt-8 mb-4">Popular News</h2>
                {popularArticles.contents.length == 0 ? <p className="text-center text-xl font-semibold mt-8">No Articles To Show !</p> :
                <div className="w-[80%] mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"> 
                    {popularArticles.contents.map((article, index)=> index <= 3 ? <ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/> : null)}
                </div> 
                }
            </> : 
            null
            }

        </>

    )
}