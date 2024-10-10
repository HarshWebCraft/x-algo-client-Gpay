import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './menubar.css'
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { setEmail } from '../actions/email_action';
import axios from 'axios'
import './loader.css'
import './signin.css'
import Loader from './loader'

import { allClientData, auth, userSchemaRedux } from '../actions/actions';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function Signin() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, emailInput] = useState('');
    const [pass, passInput] = useState('');
    const [loading, setLoading] = useState(false);

    const isAuth = useSelector(state => state.account.auth);
    console.log(isAuth)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const url = process.env.NODE_ENV === "production"
            ? "https://x-algo-gpay.onrender.com"
            : "http://localhost:5000";

        try {
            const a = await axios.post(`${url}/signin`, { email, pass });

            if (a.data.email) {
                if (a.data.verification) {
                    if (a.data.password) {
                        const Email = email;
                        const profileData = await axios.post(`${url}/userinfo`, { Email });
                        dispatch(allClientData(profileData.data));

                        localStorage.setItem('isLoggedIn', true);
                        dispatch(setEmail(email));
                        dispatch(auth(true));

                        const modalBackdrop = document.querySelector('.modal-backdrop');
                        if (modalBackdrop) {
                            modalBackdrop.classList.remove('modal-backdrop');
                        }

                        dispatch(userSchemaRedux(a.data.userSchema));
                        navigate('/home', { state: { userEmail: email } });
                    } else {
                        toast.error("Invalid Password!", {
                            position: "top-center",
                            autoClose: 3000,
                        });
                    }
                } else {
                    toast.error("Email doesn't verify!", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            } else {
                toast.error("Email doesn't exist!", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        } catch (e) {
            console.log('error ' + e);
        } finally {
            setLoading(false);  // Stop loader after the response
        }
    }

    return (
        <div>
            <ToastContainer />

            <div className="modal fade text-primary" id="signin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title m-auto" id="exampleModalLabel">Sign In</h5>
                        </div>
                        <div className="modal-body">
                            <div className='container'>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className=' text-center' controlId="formBasicEmail">
                                        <Form.Label className='mt-4'>Email address</Form.Label>
                                        <Form.Control
                                            className='emailField m-auto mt-3'
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => { emailInput(e.target.value) }}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className=' text-center' controlId="formBasicPassword">
                                        <Form.Label className='mt-4'>Password</Form.Label>
                                        <Form.Control
                                            className='passField m-auto mt-3'
                                            type="password"
                                            placeholder="Password"
                                            value={pass}
                                            onChange={(e) => { passInput(e.target.value) }}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className='text-center'>
                                        <Button variant="primary mt-3" type="submit" disabled={loading}>
                                            {loading ? (
                                                <div style={{marginLeft:10, marginRight:10}}>
                                                    <Loader/>
                                                </div>
                                            ) : "Sign In"}
                                        </Button>
                                    </Form.Group>

                                    <br />
                                    <br />
                                    <div className='text-center'>
                                        <Link className='jsdnchusdbncjsdkcmscd' data-toggle="modal" data-target="#resetPassword" data-dismiss="modal" aria-label="Close">Forget password?</Link>
                                    </div>
                                    <div className='row'>
                                        <button type="button" className='rdbutton text-primary' data-toggle="modal" data-target="#signup" data-dismiss="modal" aria-label="Close">
                                            Don't have account ? Sign up
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;
