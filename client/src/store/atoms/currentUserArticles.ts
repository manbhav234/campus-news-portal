import axios from "axios";
import { atom, selector } from "recoil";
import { currentUserAtom } from "./user";

export interface Article {
    _id: string,
    title: string,
    content: string,
    category: string,
    articleImage: string,
    author: string,
    status: string
}

export const currentUserArticlesAtom = atom({
    key: 'currentUserArticlesAtom',
    default: selector({
        key: 'fetchArticlesSelector',
        get: async ({get}) => {
            const username = get(currentUserAtom).username
            const response = await axios.get(`http://localhost:3000/api/user/articles?username=${username}`, {withCredentials: true})
            return response.data.articles as Article[]
        }
    })
})

export const publishedArticlesSelector = selector({
    key: 'publishedArticlesSelector',
    get: ({get}) => {
        const articles = get(currentUserArticlesAtom)
        const publishedArticles: Article[] = []
        articles.map((article: Article) => {
            if (article.status == 'published'){
                publishedArticles.push(article)
            }
        })
        return publishedArticles
    }
})

export const archivedArticlesSelector = selector({
    key: 'archivedArticlesSelector',
    get: ({get}) => {
        const articles = get(currentUserArticlesAtom)
        const archivedArticles: Article[] = []
        articles.map((article: Article) => {
            if (article.status == 'archived'){
                archivedArticles.push(article)
            }
        })
        return archivedArticles
    }
})

