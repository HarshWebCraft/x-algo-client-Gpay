import React from 'react'
import Signin from './Signin';
import './menubar.css'
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import { Link, useNavigate } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';


function Menubar() {

    const navigate=useNavigate()
    const contact = ()=>{
        navigate('/contactus')
    }
    const about = ()=>{
        navigate('/about')
    }

    return (
        <div>

            <div className='Menubar'>
                <div className='menubar'>
                    
                    <ul className='menu text-align-center' >
                        <li><button type="button" onClick={about} className='btn btn-primary me-4'>AboutUs</button></li>
                        <li className='me-4'> <button type="button" onClick={contact} className="btn btn-primary">ContactUs</button></li>
                        <li className='link'><button type="button" className="btn btn-primary " data-toggle="modal" data-target="#signin">
                           Sign in
                        </button></li>
                        <li><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#signup">
                            Sign up
                        </button></li>
                    </ul>
                </div>
            </div>
            <Signin/>
            <Signup/>
            <ForgetPassword/>
        </div>
    )
}

export default Menubar