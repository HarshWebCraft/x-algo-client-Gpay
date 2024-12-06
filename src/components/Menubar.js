import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo_Dark from "../images/X-Algo-Dark.png";
import "./menubar.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for hamburger and close

function Menubar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menubar-container">
      <div className="menubar d-flex">
        <div className="menubar-logo">
          <img src={Logo_Dark} alt="X-Algos" />
        </div>
        <div className="hamburger2" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`menu ${isMenuOpen ? "menu-open" : "menu-close"}`}>
          <li className="link">
            <Link style={{ color: "white" }} to="/home">
              Home
            </Link>
          </li>
          <li className="link">
            <Link style={{ color: "white" }} to="/about">
              About Us
            </Link>
          </li>
          <li className="link">
            <Link style={{ color: "white" }} to="/contactUs">
              Contact Us
            </Link>
          </li>
          <li className="link">
            <Link style={{ color: "white" }} to="/login">
              Sign in
            </Link>
          </li>
          <li className="link">
            <Link style={{ color: "white" }} to="/signup">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menubar;
