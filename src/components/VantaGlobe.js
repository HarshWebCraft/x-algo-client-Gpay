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
                                Crypto <br />
                                Currency
                            </h1>
                            <p>
                                Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.
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
