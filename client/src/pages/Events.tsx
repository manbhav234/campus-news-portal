import { useRecoilValueLoadable } from "recoil"
import { useState } from "react"
import { eventArticleSelector } from "../store/atoms/allArticles"
import ArticleCard from "../components/ArticleCard"
import Loader from "../components/Loader"
import SortBtn from "../components/SortBtn"
import { latestEventArticlesSelector } from "../store/atoms/latestArticles"
import { popularEventArticlesSelector } from "../store/atoms/popularArticles"

export default function Events(){

    const displayArticles = useRecoilValueLoadable(eventArticleSelector)
    const sortedLatestEventsArticles = useRecoilValueLoadable(latestEventArticlesSelector)
    const sortedPopularEventsArticles = useRecoilValueLoadable(popularEventArticlesSelector)
    const [sort, setSort] = useState('')
    switch (displayArticles.state) {
        case 'hasValue':
            return (
                <div className="flex flex-col gap-2 mb-12">
                    <h1 className="font-bold text-2xl text-center mt-8">Events News</h1>
                    <SortBtn sort={sort} setSort={setSort}/>
                    <div className="mt-6 grid gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto">
                        {sort == 'latest' ?  (sortedLatestEventsArticles.state == 'hasValue' ?
                        sortedLatestEventsArticles.contents.map((article)=><ArticleCard key={article._id} id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>):
                        <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>) :
                        sort == 'popular' ? (sortedPopularEventsArticles.state == 'hasValue' ?
                        sortedPopularEventsArticles.contents.map((article)=><ArticleCard key={article._id} id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>):
                        <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>) :
                        displayArticles.contents.map((article)=><ArticleCard key={article._id} id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>)
                        }
                    </div>
                </div>
            )
        case 'loading':
            return (
                <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>
            )
    }
}