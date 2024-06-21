import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './menubar.css'
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { setEmail } from '../actions/email_action';
import axios from 'axios'
import './loader.css'
import './signin.css'
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


        try {

            const a = await axios.post('http://localhost:5000/signin', { email, pass });

            console.log(a.data.verification)
            console.log(a.data.email)
            if (a.data.email) {

                if (a.data.verification) {

                    if (a.data.email) {


                        if (a.data.password) {
                            const Email = email;

                            const profileData = await axios.post('http://localhost:5000/userinfo', { Email })
                            console.log(profileData)
                            dispatch(allClientData(profileData.data))
                            
                            localStorage.setItem('isLoggedIn', true)
                            dispatch(setEmail(email));
                            dispatch(auth(true))
                            const modalBackdrop = document.querySelector('.modal-backdrop');

                            if (modalBackdrop) {
                                modalBackdrop.classList.remove('modal-backdrop');

                            }
                            console.log(isAuth)
                            // console.log(a.data.userSchema)

                            console.log(a.data.userSchema)
                            dispatch(userSchemaRedux(a.data.userSchema))
                            navigate('/home', { state: { userEmail: email } })
                            console.log('hhh')


                        }
                        else {

                            toast.error("Invalid Password !", {
                                position: "top-center",
                                autoClose: 3000,
                            });
                        }
                    }
                    else {

                        toast.error("Invalid Email !", {
                            position: "top-center",
                            autoClose: 3000,
                        });

                    }
                }
                else {
                    toast.error("Email doesn't verify !", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                }
            }



            else {
                toast.error("Email doesn't exist !", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        }
        catch (e) {
            console.log('error ' + e);
        }


    }
    return (
        <div>
            <ToastContainer />
            {/* {loading &&
                <div className='loader2 xyza'>
                    <div className="loader">

                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__ball"></div>
                    </div>
                </div>

            } */}

            <div className="modal fade text-primary" id="signin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title m-auto" id="exampleModalLabel">Sign In</h5>

                        </div>
                        <div className="modal-body">
                            <div className='container'>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label className='mt-4'>Email address</Form.Label>

                                        <Form.Control className='emailField m-auto mt-3'
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => { emailInput(e.target.value) }}
                                            required
                                        />

                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className='mt-4'>Password</Form.Label>
                                        <Form.Control className='passField m-auto mt-3'
                                            type="password"
                                            placeholder="Password"
                                            value={pass}
                                            onChange={(e) => { passInput(e.target.value) }}
                                            required
                                        />
                                    </Form.Group>


                                    <Button variant="primary mt-3" type="submit">
                                        Sign In
                                    </Button>
                                    <br></br>
                                    <br></br>
                                    <Link className='jsdnchusdbncjsdkcmscd' data-toggle="modal" data-target="#resetPassword" data-dismiss="modal" aria-label="Close">Forget password?</Link>
                                    <div className='row'>
                                        <button type="button" className='rdbutton' data-toggle="modal" data-target="#signup" data-dismiss="modal" aria-label="Close">
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

export default Signin