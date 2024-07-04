import { atom } from "recoil";

export const currentUserAtom = atom({
    key: 'currentUserAtom',
    default: {
        username: 'Anonymous',
        googleId: '',
        _id: ''
    }
})