import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo_Dark from "../images/X-Algo-Dark.png";
import "./menubar.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for hamburger and close

function Menubar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goto = (e) => {
    navigate(`/${e}`);
    setIsMenuOpen(false); // Close menu after navigating
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
          <li className="link" onClick={() => goto("home")}>
            <Link style={{ color: "white" }}>Home</Link>
          </li>
          <li className="link" onClick={() => goto("about")}>
            <Link style={{ color: "white" }}>About Us</Link>
          </li>
          <li className="link" onClick={() => goto("contactus")}>
            <Link style={{ color: "white" }}>Contact Us</Link>
          </li>
          <li className="link" onClick={() => goto("login")}>
            <Link style={{ color: "white" }}>Sign in</Link>
          </li>
          <li className="link" onClick={() => goto("signup")}>
            <Link style={{ color: "white" }}>Sign up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menubar;
