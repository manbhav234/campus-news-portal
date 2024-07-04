import { atom } from "recoil";

interface Article {
    title: string,
    content: string,
    category: string,
    articleImage: string,
    authorId: string,
    status: string
}

export const currentUserArticlesAtom = atom({
    key: 'currentUserArticlesAtom',
    default: [] as Article[]
})