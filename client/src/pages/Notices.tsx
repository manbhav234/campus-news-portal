import { useRecoilValueLoadable } from "recoil"
import { useState } from "react"
import { noticeArticleSelector } from "../store/atoms/allArticles"
import ArticleCard from "../components/ArticleCard"
import Loader from "../components/Loader"
import SortBtn from "../components/SortBtn"
import { latestNoticeArticlesSelector } from "../store/atoms/latestArticles"
import { popularNoticeArticlesSelector } from "../store/atoms/popularArticles"

export default function Notices(){

    const displayArticles = useRecoilValueLoadable(noticeArticleSelector)
    const sortedLatestNoticeArticles = useRecoilValueLoadable(latestNoticeArticlesSelector)
    const sortedPopularNoticeArticles = useRecoilValueLoadable(popularNoticeArticlesSelector)
    const [sort, setSort] = useState('')
    switch (displayArticles.state) {
        case 'hasValue':
            return (
                <div className="flex flex-col gap-2 mb-12">
                    <h1 className="font-bold text-2xl text-center mt-8">Notices</h1>
                    <SortBtn sort={sort} setSort={setSort}/>
                    <div className="mt-6 grid gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto">
                        {sort == 'latest' ? (sortedLatestNoticeArticles.state == 'hasValue' ?
                        sortedLatestNoticeArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>):
                        <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>) :
                        sort == 'popular' ? (sortedPopularNoticeArticles.state == 'hasValue' ?
                        sortedPopularNoticeArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>):
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