import { selector } from "recoil";
import { clubArticleSelector, eventArticleSelector, generalArticleSelector, noticeArticleSelector, allArticlesAtom, publishedAllArticlesSelector } from "./allArticles";
import sortByLatest from "../../utils/sortByLatest";


export const latestAllArticlesSelector = selector({
    key: 'latestAllArticlesSelector',
    get: ({get}) => {
        const allArticles = get(publishedAllArticlesSelector)
        const toBeSorted = [...allArticles]
        return sortByLatest(toBeSorted)
    }
})

export const latestClubArticlesSelector = selector({
    key: 'latestClubArticlesSelector',
    get: ({get}) => {
        const clubArticles = get(clubArticleSelector)
        const toBeSorted = [...clubArticles]
        return sortByLatest(toBeSorted)
    }
})

export const latestEventArticlesSelector = selector({
    key: 'latestEventArticlesSelector',
    get: ({get}) => {
        const eventArticles = get(eventArticleSelector)
        const toBeSorted = [...eventArticles]
        return sortByLatest(toBeSorted)
    }
})

export const latestGeneralArticlesSelector = selector({
    key: 'latestGeneralArticlesSelector',
    get: ({get}) => {
        const generalArticles = get(generalArticleSelector)
        const toBeSorted = [...generalArticles]
        return sortByLatest(toBeSorted)
    }
})

export const latestNoticeArticlesSelector = selector({
    key: 'latestNoticeArticlesSelector',
    get: ({get}) => {
        const noticeArticles = get(noticeArticleSelector)
        const toBeSorted = [...noticeArticles]
        return sortByLatest(toBeSorted)
    }
})