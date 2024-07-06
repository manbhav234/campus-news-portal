import axios from "axios";
import { atom, selector } from "recoil";
import { currentUserAtom } from "./user";

export interface EmojiType {
    emoji: string,
    count: number
}

export interface Article {
    _id: string,
    title: string,
    content: string,
    category: string,
    articleImage: string,
    author: string,
    status: string,
    createdAt: number,
    reactions: EmojiType[]
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
        const publishedArticles: Article[] = articles.filter((article) => article.status == 'published')
        return publishedArticles
    }
})

export const archivedArticlesSelector = selector({
    key: 'archivedArticlesSelector',
    get: ({get}) => {
        const articles = get(currentUserArticlesAtom)
        const archivedArticles: Article[] = articles.filter((article)=> article.status == 'archived')
        return archivedArticles
    }
})

