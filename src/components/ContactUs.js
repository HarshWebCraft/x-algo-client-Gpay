import React from 'react'
import './contactus.css'
import contactBg from '../images/contact-bg.jpg'
import contactBg2 from '../images/contact-bg-2.jpg'
import back2 from '../images/back2.png'
import { useNavigate } from 'react-router-dom'
function ContactUs() {
    const navigate=useNavigate()
    const goback=()=>{
        navigate('/')
    }
    return (
        <div className="contact2" style={{backgroundImage:`url(${contactBg})`}} id="contact">
            <div className="container">
                <div className='row'>
                <div className='col-1 d-flex xyzabc'>
                <img src={back2} height={50} width={70} onClick={goback} />
                <img src={back2} height={50} width={70} className='xyz' onClick={goback} />
                </div>
                </div>
                <div className="row contact-container">
                    <div className="col-lg-12">
                        <div className="card card-shadow border-0 mb-4 " style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"}}>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="contact-box p-4" >
                                        <h4 className="title">Contact Us</h4>
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group mt-3">
                                                        <input className="form-control" type="text" placeholder="name"/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group mt-3">
                                                        <input className="form-control" type="text" placeholder="email"/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group mt-3">
                                                        <input className="form-control" type="text" placeholder="phone"/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group mt-3">
                                                        <input className="form-control" type="text" placeholder="location"/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mt-3">
                                                        <input className="form-control" type="text" placeholder="message"/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <button type="submit" className="btn btn-danger-gradiant mt-3 mb-3 text-white border-0 py-2 px-3"><span> SUBMIT NOW <i className="ti-arrow-right"></i></span></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 bg-image" style={{backgroundImage:`url(${contactBg2})`}}>
                                    <div className="detail-box p-4">
                                        <h5 className="text-white font-weight-light mb-3">ADDRESS</h5>
                                        <p className="text-white op-7">Marwadiuniversity
                                            <br/> Rajkot, Gujarat </p>
                                        <h5 className="text-white font-weight-light mb-3 mt-4">CALL US</h5>
                                        <p className="text-white op-7">88494 39366
                                            <br/>95104 44306</p>
                                        <div className="round-social light">
                                            <a href="#" className="ml-0 text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-facebook"></i></a>
                                            <a href="#" className="text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-twitter"></i></a>
                                            <a href="#" className="text-decoration-none text-white border border-white rounded-circle"><i className="icon-social-youtube"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs