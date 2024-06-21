import { useLocation, useNavigate } from 'react-router-dom';
import './Otpverify.css';
import { Button, Form } from 'react-bootstrap';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import skjdasbjksd from '../images/hero-bg.png'

function Otpverify() {
    const location = useLocation();
    const navigate = useNavigate();
    const { otpno, number } = location.state || "";
    let attempt = 3

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        if (value.length > 1) return;
        setOtp(prevOtp => {
            const updatedOtp = [...prevOtp];
            updatedOtp[index] = value;
            return updatedOtp;
        });
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    console.log("otp is:"+otpno)
    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (attempt > 0) {
            attempt--
            if (otpno == enteredOtp) {
                Swal.fire({
                    title: "Correct OTP",
                    icon: "success"
                });
                navigate('/')
            } else {
                Swal.fire({
                    icon: "error",
                    title: "OTP is incorrect"
                });
            }
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Try many times"
            });
            navigate('/verify-email')
        }
    };

    return (
        <div className="height-100 d-flex justify-content-center align-items-center">
            <img src={skjdasbjksd} className='bg_img'/>
            <div className="position-absolute">
                <div className="card p-2 text-center">
                    <h6>Please enter the one time password to verify your account</h6>
                    <div> <span>A code has been sent to</span> <small>{number}</small> </div>
                    <Form id="otp" onSubmit={handleSubmit} className="inputs d-flex flex-row justify-content-center mt-2">
                        {otp.map((digit, index) => (
                            <Form.Control
                                key={index}
                                className="m-2 text-center form-control rounded"
                                onChange={(e) => handleInputChange(e, index)}
                                type="number"
                                value={digit}
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                        <br/>
                        <Button type="submit" className="btn px-4 validate mcdskmcdkjsncjskd">Validate</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Otpverify;
