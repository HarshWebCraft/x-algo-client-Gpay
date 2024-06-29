import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import './resetPassword.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
function ResetPassword() {
    let params = new URLSearchParams(document.location.search);
    let encodedData = params.get("token");
    console.log(encodedData)
    const [pass, passInput] = useState('');
    const [pass2, pass2Input] = useState('');
    const [expired, setexpired] = useState(false)
    useEffect(() => {
        const a = async () => {
            const response = await axios.post('https://x-algo-gpay.onrender.com/checkLink', { encodedData });
            setexpired(response.data.reset)
        }
        a()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('hello')
        const response = await axios.post('https://x-algo-gpay.onrender.com/resetPassword', { encodedData, pass });
        if (response.data.reset) {
            alert("password changed")
            window.close();
        }
        else { }

    }
    return (

        <div className='container'>
            {expired ?
                <div className="register-photo">
                    <div className="form-container">
                        <div className="image-holder"></div>
                        <form method="post" onSubmit={handleSubmit}>
                            <h2 className="text-center"><strong>Reset Password</strong> </h2>
                            <div className="form-group"><input className="form-control" onChange={(e) => { passInput(e.target.value) }} type="password" name="password" placeholder="New Password" /></div>
                            <div className="form-group"><input className="form-control" onChange={(e) => { pass2Input(e.target.value) }} type="password" name="password-repeat" placeholder="Password (repeat)" /></div>
                            <div className="form-group">
                            </div>
                            <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Reset Password</button></div></form>
                    </div>
                </div>
                : 'Link Expired'}
        </div>
    )
}

export default ResetPassword