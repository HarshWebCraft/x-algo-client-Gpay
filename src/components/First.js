import React from "react";
import bg from "../images/bg2.jpg";
import about from "../images/about.png";
import icon3 from "../images/icon-3.png";
import icon4 from "../images/icon-4.png";
import icon5 from "../images/icon-5.png";
import icon6 from "../images/icon-6.png";
import icon7 from "../images/icon-7.png";
import icon8 from "../images/icon-8.png";
import Menubar from "./Menubar";
import VantaGlobe from "./VantaGlobe";
import "./First.css";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/Home.json";

function First() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const redirect = useNavigate();

  const goto = (e) => {
    redirect(`/${e}`);
  };

  return (
    <div style={{ backgroundColor: "#111111" }}>
      <Menubar />
      {/* <Navbar userEmail={userEmail}  darkMode={darkMode} toggleDarkMode={toggleDarkMode}/> */}
      {/* <VantaGlobe /> */}
      <div className="d-flex xjsgk container">
        <div className="banner-container">
          <p className="banner-intro mb-0">Introducing</p>
          <h1 className="banner-title">
            Easy <br />
            Trading
          </h1>
          <p className="banner-subtitle">The Future of Trading Guide</p>
          <p className="banner-description">
            Discover a smarter way to trade with our innovative tools and
            insights.
          </p>
          <div className="banner-buttons">
            <button className="btn-signin" onClick={(e) => goto("login")}>
              Sign In
            </button>
            <button className="btn-free-trial">Free Trial</button>
          </div>
        </div>
        <div className="lottie-container ">
          <Lottie
            options={defaultOptions}
            width={"80%"}
            style={{ margin: "3em 0 0 0" }}
          />
        </div>
      </div>

      <div
        className="container-fluid bg-light footer pt-5 wowhgcghchg fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4 hjgjlk">Quick Links</h5>
              <Link className="btn btn-link" to="/about">
                About Us
              </Link>
              <Link className="btn btn-link" to="/contactus">
                Contact Us
              </Link>
              <Link className="btn btn-link" to="/refund">
                Refund & Cancellation
              </Link>
              <Link className="btn btn-link" to="/termcondistion">
                Terms & Condition
              </Link>
              <Link className="btn btn-link" to="/privacypolicy">
                PrivacyPolicy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default First;
