import { atom, selector } from "recoil";
import axios from "axios";
import { Article } from "./currentUserArticles";

export const allArticlesAtom = atom({
    key: 'allArticlesAtom',
    default: selector({
        key: 'fetchAllArticlesSelector',
        get: async ({get}) =>{
            const response = await axios.get('/api/articles/getAll')
            return response.data.articles as Article[]
        }
    })
})

export const publishedAllArticlesSelector = selector({
    key: 'publishedAllArticlesSelector',
    get: ({get}) => {
        const allArticles = get(allArticlesAtom)
        const publishedArticles : Article[] = allArticles.filter((article : Article) => article.status == 'published')
        return publishedArticles
    }
})

export const generalArticleSelector = selector({
    key: 'generalArticleSelector',
    get: ({get}) => {
        const articles = get(publishedAllArticlesSelector)
        const generalArticles: Article[] = articles.filter((article)=> article.category == 'general')
        return generalArticles
    }
})

export const noticeArticleSelector = selector({
    key: 'noticeArticleSelector',
    get: ({get}) => {
        const articles = get(publishedAllArticlesSelector)
        const noticeArticles: Article[] = articles.filter((article)=> article.category == 'notice')
        return noticeArticles
    }
})

export const eventArticleSelector = selector({
    key: 'eventArticleSelector',
    get: ({get}) => {
        const articles = get(publishedAllArticlesSelector)
        const eventArticles: Article[] = articles.filter((article)=> article.category == 'event')
        return eventArticles
    }
})

export const clubArticleSelector = selector({
    key: 'clubArticleSelector',
    get: ({get}) => {
        const articles = get(publishedAllArticlesSelector)
        const clubArticles: Article[] = articles.filter((article)=> article.category == 'club')
        return clubArticles
    }
})

export const noneArticleSelector = selector({
    key: 'noneArticleSelector',
    get: ({get}) => {
        const articles = get(publishedAllArticlesSelector)
        const noneArticles: Article[] = articles.filter((article)=> article.category == 'none')
        return noneArticles
    }
})