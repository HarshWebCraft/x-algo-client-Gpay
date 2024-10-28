import React from 'react'
import Signin from './Signin';
import './menubar.css'
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import { Link, useNavigate } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';


function Menubar() {

    const redirect = useNavigate();

    const gotoSignin = () =>{
        redirect('/login')
    }
    const gotoSignup = () =>{
        redirect('/signup')
    }
    

    return (
        <div>

            <div className='menubar'>
                <ul className='menu text-align-center' >
                    <li className='link'>
                    <button type="button"  className="btn btn-primary " onClick={gotoSignin}>
                        Sign in
                    </button>
                    </li>
                    <li>
                        <button type="button"  className="btn btn-primary "onClick={gotoSignup}>
                        Sign up
                    </button>
                    </li>
                </ul>
            </div>
            <Signin />
            <Signup />
            <ForgetPassword />
        </div>
    )
}

export default Menubar