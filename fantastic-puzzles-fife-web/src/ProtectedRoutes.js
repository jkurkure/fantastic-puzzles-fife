import {Outlet, Navigate} from 'react-router-dom'

export default function ProtectedRoutes() {
    return localStorage.getItem("token") ? <Outlet/> : <Navigate to="/sign-in"/>
}
