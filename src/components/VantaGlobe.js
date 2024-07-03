import React from 'react';
import heroBg from '../images/hero-bg.png';
import sliderImg from '../images/slider-img.png';
import './VantaGlobe.css';

const VantaGlobe = () => {
    return (
        <div>
            <div className="hero_bg_box">
                <img src={heroBg} className='bg_img' alt="Hero Background" />
            </div>

            <div className="slider_section">
                <div className="row">
                    <div className="col-md-5 mx-5 mt-5">
                        <div className="detail-box">
                            <h1>
                                Best <br />
                                E-commerce
                            </h1>
                            <p>
                            Discover Your Style, Shop with a Smile <br/>
                            Exclusive Deals Await - Start Your Journey Today!
                            </p>
                            <div className="btn-box">
                                <a href="#" className="btn1">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mx-5 mt-5">
                        <div className="img-box">
                            <img src={sliderImg} alt="Slider Image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VantaGlobe;
