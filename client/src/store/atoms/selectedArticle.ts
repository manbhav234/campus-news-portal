import { atom, selector } from "recoil";
import { Article, Comment } from "./currentUserArticles";
import axios from "axios";


export const selectedArticleAtom = atom({
    key: 'selectedArticleAtom',
    default: {} as Article
})

export const selectedArticleCommentsAtom = atom({
    key: 'currentArticleCommentsAtom',
    default: selector({
        key: 'fetchCommentsSelector',
        get: async ({get}) => {
            const selectedArticle = get(selectedArticleAtom)
            const response = await axios.get(`http://localhost:3000/api/articles/getComments?id=${selectedArticle._id}`)
            return response.data.comments as Comment[]
        }
    })
})


export const loadedCommentsAtom = atom({
    key: 'loadedCommentsAtom',
    default : selector({
        key: 'fetchCommentsToLoadSelector',
        get: async ({get}) => {
            const array = get(selectedArticleCommentsAtom)
            const loadedComments = []
            for (let i = 0; i < array.length; i++){
                const response = await axios.get(`http://localhost:3000/api/comments/getComment?id=${array[i]}`)
                loadedComments.push(response.data.comment)
            }
            return loadedComments
        }
    })
})