import { Navigate, Outlet } from 'react-router-dom'
import Home from './Home'
import First from './First'

const PrivateRoute = ({children}) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    console.log("[][][][][][][][]"+isLoggedIn)
    return (
        isLoggedIn == null ? <Navigate to='/'/>: children 
    )
}
export default PrivateRoute