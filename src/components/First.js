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
            <div class="container-xxl dfhvbdfhunvjdnvjk py-5">
                <div class="container">
                    <div class="row g-5 align-items-center">
                        <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <img class="img-fluid" src={about} alt=""/>
                        </div>
                        <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div class="h-100">
                                <h1 class="display-6">About Us</h1>
                                <p class="text-primary fs-5 mb-4">The Most Trusted Cryptocurrency Platform</p>
                                <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                                    <span>Tempor erat elitr rebum at clita</span>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                                    <span>Tempor erat elitr rebum at clita</span>
                                </div>
                                <div class="d-flex align-items-center mb-4">
                                    <i class="fa fa-check bg-light text-primary btn-sm-square rounded-circle me-3 fw-bold"></i>
                                    <span>Tempor erat elitr rebum at clita</span>
                                </div>
                                <a class="btn btn-primary py-3 px-4" href="">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth:"500px"}}>
                        <h1 class="display-6">Why Us!</h1>
                        <p class="text-primary fs-5 mb-5">The Best In The crypto Industry</p>
                    </div>
                    <div class="row g-5">
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="d-flex align-items-start">
                                <img class="img-fluid flex-shrink-0" src={icon7} alt=""/>
                                    <div class="ps-4">
                                        <h5 class="mb-3">Easy To Start</h5>
                                        <span>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo</span>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="d-flex align-items-start">
                                <img class="img-fluid flex-shrink-0" src={icon6} alt=""/>
                                    <div class="ps-4">
                                        <h5 class="mb-3">Safe & Secure</h5>
                                        <span>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo</span>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div class="d-flex align-items-start">
                                <img class="img-fluid flex-shrink-0" src={icon5} alt=""/>
                                    <div class="ps-4">
                                        <h5 class="mb-3">Affordable Plans</h5>
                                        <span>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo</span>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="d-flex align-items-start">
                                <img class="img-fluid flex-shrink-0" src={icon4} alt=""/>
                                    <div class="ps-4">
                                        <h5 class="mb-3">Secure Storage</h5>
                                        <span>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo</span>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="d-flex align-items-start">
                                <img class="img-fluid flex-shrink-0" src={icon3} alt=""/>
                                    <div class="ps-4">
                                        <h5 class="mb-3">Protected By Insurance</h5>
                                        <span>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo</span>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div class="d-flex align-items-start">
                                <img class="img-fluid flex-shrink-0" src={icon8} alt=""/>
                                    <div class="ps-4">
                                        <h5 class="mb-3">24/7 Support</h5>
                                        <span>Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth:"500px"}}>
                        <h1 class="display-6">FAQs</h1>
                        <p class="text-primary fs-5 mb-5">Frequently Asked Questions</p>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item wow fadeInUp" data-wow-delay="0.1s">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            How to build a website?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item wow fadeInUp" data-wow-delay="0.2s">
                                    <h2 class="accordion-header" id="headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How long will it take to get a new website?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item wow fadeInUp" data-wow-delay="0.3s">
                                    <h2 class="accordion-header" id="headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Do you only create HTML websites?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item wow fadeInUp" data-wow-delay="0.4s">
                                    <h2 class="accordion-header" id="headingFour">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            Will my website be mobile-friendly?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item wow fadeInUp" data-wow-delay="0.5s">
                                    <h2 class="accordion-header" id="headingFive">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            Will you maintain my site for me?
                                        </button>
                                    </h2>
                                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item wow fadeInUp" data-wow-delay="0.6s">
                                    <h2 class="accordion-header" id="headingSix">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                            I’m on a strict budget. Do you have any low cost options?
                                        </button>
                                    </h2>
                                    <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item wow fadeInUp" data-wow-delay="0.7s">
                                    <h2 class="accordion-header" id="headingSeven">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                            Will you maintain my site for me?
                                        </button>
                                    </h2>
                                    <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item wow fadeInUp" data-wow-delay="0.8s">
                                    <h2 class="accordion-header" id="headingEight">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                            I’m on a strict budget. Do you have any low cost options?
                                        </button>
                                    </h2>
                                    <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam sed sed magna et magna diam aliquyam amet dolore ipsum erat duo. Sit rebum magna duo labore no diam.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="container-fluid bg-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container py-5">
                    <div class="row g-5">
                        <div class="col-md-6">

                            <h1 class="text-primary mb-4"><img class="img-fluid me-2" src="img/icon-1.png" alt="" style={{width:"50px"}}/>X-Algo</h1>
                            <span>Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</span>
                        </div>
                        <div class="col-md-6">
                            <h5 class="mb-4">Newsletter</h5>
                            <p>Clita erat ipsum et lorem et sit, sed stet lorem sit clita.</p>
                            <div class="position-relative">
                                <input class="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                                <button type="button" class="btn btn-primary py-2 px-3 position-absolute top-0 end-0">SignUp</button>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h5 class="mb-4">Get In Touch</h5>
                            <p><i class="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                            <p><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p><i class="fa fa-envelope me-3"></i>info@example.com</p>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h5 class="mb-4">Quick Links</h5>
                            <Link class="btn btn-link" to='/about'>About Us</Link>
                            <Link class="btn btn-link" to='/contactus'>Contact Us</Link>
                            <Link class="btn btn-link" to='/refund'>Refund & Cancellation</Link>
                            <Link class="btn btn-link" to='/termcondistion'>Terms & Condition</Link>
                            <Link class="btn btn-link" to='/privacypolicy'>PrivacyPolicy</Link>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h5 class="mb-4">Follow Us</h5>
                            {/* <div class="d-flex">
                                <a class="btn btn-square rounded-circle me-1" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square rounded-circle me-1" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square rounded-circle me-1" href=""><i class="fab fa-youtube"></i></a>
                                <a class="btn btn-square rounded-circle me-1" href=""><i class="fab fa-linkedin-in"></i></a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default First