import React from 'react'
import Signin from './Signin';
import './menubar.css'
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import { Link, useNavigate } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';


function Menubar() {



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
                <button
                    className="navbar-toggler jchjsdbchsdvvbsdv center"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ backdropFilter: 'blur(100px)'}}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#signin">
                                Sign In
                            </button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#signup">
                                Sign Up
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <Signin />
            <Signup />
            <ForgetPassword />
        </div>
    )
}

export default Menubar