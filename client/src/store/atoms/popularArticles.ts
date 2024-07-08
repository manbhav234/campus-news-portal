import { selector } from "recoil";
import { allArticlesAtom, clubArticleSelector, eventArticleSelector, generalArticleSelector, noticeArticleSelector } from "./allArticles";
import sortByPopularity from "../../utils/sortByPopularity";

export const popularAllArticleSelector = selector({
    key: 'popularAllArticlesSelector',
    get: ({get}) => {
        const allArticles = get(allArticlesAtom)
        const toBeSorted = [...allArticles]
        return sortByPopularity(toBeSorted)
    }
})

export const popularClubArticlesSelector = selector({
    key: 'popularClubArticlesSelector',
    get: ({get}) => {
        const clubArticles = get(clubArticleSelector)
        const toBeSorted = [...clubArticles]
        return sortByPopularity(toBeSorted)
    }
})

export const popularEventArticlesSelector = selector({
    key: 'popularEventArticlesSelector',
    get: ({get}) => {
        const eventArticles = get(eventArticleSelector)
        const toBeSorted = [...eventArticles]
        return sortByPopularity(toBeSorted)
    }
})

export const popularGeneralArticlesSelector = selector({
    key: 'popularGeneralArticlesSelector',
    get: ({get}) => {
        const generalArticles = get(generalArticleSelector)
        const toBeSorted = [...generalArticles]
        return sortByPopularity(toBeSorted)
    }
})

export const popularNoticeArticlesSelector = selector({
    key: 'popularNoticeArticlesSelector',
    get: ({get}) => {
        const noticeArticles = get(noticeArticleSelector)
        const toBeSorted = [...noticeArticles]
        return sortByPopularity(toBeSorted)
    }
})