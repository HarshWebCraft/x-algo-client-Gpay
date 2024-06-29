import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './verifyemail.css';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Modal from 'react-bootstrap/Modal';
import sideImage from '../images/signup-image.jpg';
import skjdasbjksd from '../images/hero-bg.png'

function Verifyemail() {

    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    // const [otp, setotp] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const email = location.state?.userEmail || "";
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const urlParams = new URLSearchParams(window.location.search);
    const urlEmail = urlParams.get('email');
    const iv = urlParams.get('iv');
    console.log("??????????????????????????")
    console.log(">>>>>>>>>>>>>>>>>"+urlEmail)
    console.log(">>>>>>>>>>>>>>>>>"+iv)
    const url = process.env.NODE_ENV === "production" 
    ? "https://x-algo-gpay.onrender.com" 
    : "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (!name || !password || !confirmPassword || !mobileNumber) {
            Swal.fire({
                title: "Error",
                text: "All fields are required",
                icon: "error"
            });
            return;
        }

        if (password === confirmPassword) {
            try {
                await axios.post(`${url}/verifyemail`, { urlEmail, iv ,password, mobileNumber, name });
                setLoading(false);
                handleShow();
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            Swal.fire({
                title: "",
                text: "Both passwords are not the same",
                icon: "error"
            });
            setLoading(false);
        }
    };

    function MyModalWithGrid(props) {

        const handleSubmit = () =>{
            handleClose()
            let otp = (Math.trunc(Math.random()*1000000))
            navigate("/otp-verify",{state:{otpno:otp,number:mobileNumber}})
        }
        
        
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title className='hasbdhjasdahjhjhj'>Confirm Number</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Is this the correct number? <br/> <h2>{`${mobileNumber}`}</h2> </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Edit
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Send OTP
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (
        <div className="animatedbounceInDown">
            <img src={skjdasbjksd} className='bg_img'/>
            <div className="main-container">
                <div className="jshvdjsdvjhsdvjh">
                    <span className="error animated tada" id="msg"></span>
                    <Form name="form1" className="box" onSubmit={handleSubmit}>
                        <Form.Label>Sign up</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} autoComplete="off" required/>
                        <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete="off" required/>
                        <Form.Control type="password" name="confirm-password" placeholder="Confirm Password" id="pwd" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} autoComplete="off" required/>
                        <Form.Control type="number" name="mobile-number" placeholder="Mobile no" id="monumber" value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} autoComplete="off" required/>
                        <Button type="submit" value="Sign in" className="btn1" disabled={loading}>
                            {loading ? 'Sending...' : 'Sign up'}
                        </Button>
                        <MyModalWithGrid show={show} onHide={() => setShow(false)} />
                    </Form>
                </div>
                <div className="side-image-container">
                    <img className="side-image" src={sideImage} alt="Side Image" />

                </div>
            </div>
        </div>

    );
}

export default Verifyemail;
