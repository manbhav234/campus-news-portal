import { useRecoilValueLoadable } from "recoil"
import { useState } from "react"
import { allArticlesAtom } from "../store/atoms/allArticles"
import ArticleCard from "../components/ArticleCard"
import Loader from "../components/Loader"
import SortBtn from "../components/SortBtn"
import { latestAllArticlesSelector } from "../store/atoms/latestArticles"

export default function AllArticles(){

    const displayArticles = useRecoilValueLoadable(allArticlesAtom)
    const sortedAllArticles = useRecoilValueLoadable(latestAllArticlesSelector)
    const [sort, setSort] = useState(false)
    switch (displayArticles.state) {
        case 'hasValue':
            return (
                <div className="flex flex-col gap-2 mb-12">
                    <h1 className="font-bold text-2xl text-center mt-8">All News Articles</h1>
                    <SortBtn sort={sort} setSort={setSort}/>
                    <div className="mt-6 grid gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto">
                    {sort ? sortedAllArticles.state == 'hasValue' ?
                    sortedAllArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author} createdAt={article.createdAt}/>) : 
                    <div className="flex justify-center items-center h-screen w-screen"><Loader/></div> :
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