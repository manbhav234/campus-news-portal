import { useRecoilValueLoadable } from "recoil"
import { noticeArticleSelector } from "../store/atoms/allArticles"
import ArticleCard from "../components/ArticleCard"
import Loader from "../components/Loader"

export default function Clubs(){

    const noticeArticles = useRecoilValueLoadable(noticeArticleSelector)

    switch (noticeArticles.state) {
        case 'hasValue':
            return (
                <div>
                    <h1 className="font-bold text-2xl text-center mt-8">Events News</h1>
                    <button>Sort</button>
                    <div className="mt-6 grid gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto">
                        {noticeArticles.contents.map((article)=><ArticleCard id={article._id} title={article.title} content={article.content} category={article.category} articleImage={article.articleImage} status={article.status} author={article.author}/>)}
                    </div>
                </div>
            )
        case 'loading':
            return (
                <div className="flex justify-center items-center h-screen w-screen"><Loader/></div>
            )
    }
}