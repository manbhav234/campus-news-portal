import axios from "axios";
import { atom, selector } from "recoil";
import { currentUserAtom } from "./user";

export interface EmojiType {
    _id: string
    emoji: string,
    count: number
}

export interface Comment {
    articleId: string
    author: string,
    createdAt: number,
    content: string
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
    reactions: EmojiType[],
    comments: Comment[]
}

export const currentUserArticlesAtom = atom({
    key: 'currentUserArticlesAtom',
    default: selector({
        key: 'fetchArticlesSelector',
        get: async ({get}) => {
            const user = get(currentUserAtom)
            const response = await axios.get(`/api/user/articles?id=${user._id}`, {withCredentials: true})
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

