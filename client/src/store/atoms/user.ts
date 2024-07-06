import { atom } from "recoil";

interface User {
    _id: string,
    username: string,
    googleId: string
}

export const currentUserAtom = atom({
    key: 'currentUserAtom',
    default: {
        username: 'Anonymous',
        googleId: '',
        _id: ''
    } as User
})