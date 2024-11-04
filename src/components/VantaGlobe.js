import React from "react";
import { motion } from "framer-motion";
import heroBg from "../images/hero-bg.png";
import sliderImg from "../images/slider-img.png";
import "./VantaGlobe.css";

const VantaGlobe = () => {
  return (
    <div className="bhttgkl">
      <motion.div
        className="hero_bg_box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <img src={heroBg} className="img-fluid" alt="Hero Background" />
      </motion.div>

      <div className="slider_section">
        <div className="row">
          <motion.div
            className="col-lg-5 col-md-6 col-sm-12 mx-auto mt-5"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            <div className="detail-box">
              <motion.h1
                className="asadascascasc text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              >
                Bestc:\Users\VICTUS\Downloads\Animation - 1730712692349.json
                Algo
              </motion.h1>
              <motion.p
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
              >
                Unlock Your Trading Potential - Invest with Confidence Discover
                the power of algorithmic trading with precision and speed. Take
                advantage of exclusive strategies designed for today's market
                dynamics. Maximize your opportunities - Start your trading
                journey with us today!"
              </motion.p>
              <div className="btn-box">
                <motion.a
                  href="#"
                  className="btn1 hbagscvghasc"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  Read More
                </motion.a>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="col-lg-5 col-md-6 col-sm-12 mx-auto mt-5"
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            <div className="img-box">
              <motion.img
                src={sliderImg}
                alt="Slider Image"
                className="img-fluid"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VantaGlobe;
