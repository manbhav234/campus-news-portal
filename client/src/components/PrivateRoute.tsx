import { Outlet, Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { currentUserAtom } from "../store/atoms/user"

export default function PrivateRoute(){
    const currentUser = useRecoilValue(currentUserAtom)
    return (
        currentUser.googleId == '' ? <Navigate to={'/'}/> : <Outlet/>
    )
}