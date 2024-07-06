import { useRecoilValue } from "recoil";
import { Article } from "../store/atoms/currentUserArticles";
import { allArticlesAtom } from "../store/atoms/allArticles";

export default function findArticle(id: string): Article {
    const articles = useRecoilValue(allArticlesAtom)
    let reqArticle = {} as Article
    for (let i = 0; i < articles.length; i++){
        if (articles[i]._id == id){
            reqArticle = articles[i]
            break
        }
    }
    return reqArticle
}