import { useRecoilValueLoadable } from "recoil"
import { useState } from "react"
import { clubArticleSelector } from "../store/atoms/allArticles"
import ArticleCard from "../components/ArticleCard"
import Loader from "../components/Loader"
import SortBtn from "../components/SortBtn"
import { latestClubArticlesSelector } from "../store/atoms/latestArticles"
import { popularClubArticlesSelector } from "../store/atoms/popularArticles"

export default function Clubs(){

    const displayArticles = useRecoilValueLoadable(clubArticleSelector)
    const sortedLatestClubArticles = useRecoilValueLoadable(latestClubArticlesSelector)
    const sortedPopularClubArticles = useRecoilValueLoadable(popularClubArticlesSelector)
    const [sort, setSort] = useState('')
    switch (displayArticles.state) {
        case 'hasValue':
            return (
                <div className="flex flex-col gap-2 mb-12">
                    <h1 className="font-bold text-2xl text-center mt-8">Clubs & Department News</h1>
                    <SortBtn sort={sort} setSort={setSort}/>
                    <div className="mt-6 grid gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto">
                        {sort == 'latest' ?  (sortedLatestClubArticles.state == 'hasValue' ?
                        sortedLatestClubArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>):
                        <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>) :
                        sort == 'popular' ? (sortedPopularClubArticles.state == 'hasValue' ?
                        sortedPopularClubArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>):
                        <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>) :
                        displayArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>)
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