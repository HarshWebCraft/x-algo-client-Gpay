import { Navigate, Outlet } from 'react-router-dom'
import Home from './Home'
import First from './First'

const PrivateRoute2 = ({children}) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    console.log("[][][][][][][][]"+isLoggedIn)
    return (
        isLoggedIn == null ? children: <Navigate to='/home'/> 
    )
}
export default PrivateRoute2