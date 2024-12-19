import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import Logo_Dark from "../images/X-Algo-Dark.png";
import Logo_Light from "../images/X-Algo-Light.png";
import Wallet from "../images/wallet.png";
import Logout from "../images/logout.png";
import { Image } from "react-bootstrap";
import profile from "../images/profile.png";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState("Strategies");
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for dropdown

  // Update selected strategy based on URL
  useEffect(() => {
    if (location.pathname.startsWith("/Strategies/")) {
      const strategy = location.pathname.split("/")[2];
      // setSelectedStrategy(strategy.charAt(0).toUpperCase() + strategy.slice(1));
    }
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleStrategySelect = (strategy) => {
    // setSelectedStrategy(strategy);
    setDropdownOpen(false); // Close dropdown
    navigate(`/Strategies/${strategy.replace(" ", "")}`);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  const gotoWallet = () => {
    navigate("/home/myWallet");
  };
  const gotoProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="navbar-logo">
        <img src={`${darkMode ? Logo_Dark : Logo_Light}`} alt="X-Algos" />
      </div>
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link
            to="/home"
            className={location.pathname === "/home" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/Active"
            className={location.pathname === "/Active" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Active
          </Link>
        </li>
        <li className="dropdown" ref={dropdownRef}>
          <div
            className={`dropdown-toggle justify-content-center ${
              location.pathname.startsWith("/Strategies") ? "active" : ""
            }`}
            onClick={toggleDropdown}
          >
            <div>
              <span>{selectedStrategy}</span>
              <span
                className="ml-2"
                style={{ fontSize: "12px", lineHeight: "1" }}
              >
                ▼
              </span>
            </div>
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li
                className={selectedStrategy === "Subscribed" ? "active" : ""}
                onClick={() => handleStrategySelect("Subscribed")}
              >
                Subscribed
              </li>
              <li
                className={selectedStrategy === "Deployed" ? "active" : ""}
                onClick={() => handleStrategySelect("Deployed")}
              >
                Deployed
              </li>
              {/* <li
                className={selectedStrategy === "Active" ? "active" : ""}
                onClick={() => handleStrategySelect("Active")}
              >
                Active
              </li> */}
              <li
                className={selectedStrategy === "Marketplace" ? "active" : ""}
                onClick={() => handleStrategySelect("Marketplace")}
              >
                Marketplace
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link
            to="/PaperTrading"
            className={location.pathname === "/PaperTrading" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Paper trading
          </Link>
        </li>
        <li>
          <Link
            to="/home/broker"
            className={location.pathname === "/home/broker" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Manage Broker
          </Link>
        </li>
      </div>
      <div className="navbar-icons">
        <div className="icon-container" title="Profile">
          <Image
            src={profile}
            height={30}
            className="logout-icon"
            onClick={gotoProfile}
          />
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
