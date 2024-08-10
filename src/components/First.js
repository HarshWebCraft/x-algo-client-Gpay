import React from 'react'
import bg from '../images/bg2.jpg'
import about from '../images/about.png'
import icon3 from '../images/icon-3.png'
import icon4 from '../images/icon-4.png'
import icon5 from '../images/icon-5.png'
import icon6 from '../images/icon-6.png'
import icon7 from '../images/icon-7.png'
import icon8 from '../images/icon-8.png'
import Menubar from './Menubar'
import VantaGlobe from './VantaGlobe'
import './First.css'
import AboutUs from './AboutUs'
import { Link } from 'react-router-dom'

function First() {

    return (
        <div>
            <Menubar />
            <VantaGlobe />
            <div class="container-fluid bg-light footer pt-5 wowhgcghchg fadeIn" data-wow-delay="0.1s">
                <div class="container py-5">
                    <div class="row g-5">
                        
                        <div class="col-lg-3 col-md-6">
                            <h5 class="mb-4 hjgjlk">Quick Links</h5>
                            <Link class="btn btn-link" to='/about'>About Us</Link>
                            <Link class="btn btn-link" to='/contactus'>Contact Us</Link>
                            <Link class="btn btn-link" to='/refund'>Refund & Cancellation</Link>
                            <Link class="btn btn-link" to='/termcondistion'>Terms & Condition</Link>
                            <Link class="btn btn-link" to='/privacypolicy'>PrivacyPolicy</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default First