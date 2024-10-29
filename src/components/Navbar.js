import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import Logo_Dark from "../images/X-Algo-Dark.png";
import Logo_Light from "../images/X-Algo-Light.png";
import Wallet from "../images/wallet.png";
import Logout from "../images/logout.png";
import { Image } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState("Strategies"); // New state for selected strategy
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getActiveLink = () => {
    if (location.pathname.startsWith("/Strategies")) {
      console.log(location.pathname);

      return "Strategies";
    }
    switch (location.pathname) {
      case "/home":
        return "Dashboard";
      case "/PaperTrading":
        return "Paper trading";
      case "/Services":
        return "Services";
      case "/home/broker":
        return "Broker";
      default:
        return "Dashboard";
    }
  };

  const [activeLink, setActiveLink] = useState(getActiveLink());

  useEffect(() => {
    setActiveLink(getActiveLink());
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy); // Update selected strategy
    setDropdownOpen(false); // Close dropdown
    setMenuOpen(false); // Close menu
    navigate(`/Strategies/${strategy.replace(" ", "")}`); // Navigate to selected strategy
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
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
            className={activeLink === "Dashboard" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/Active"
            className={activeLink === "Active" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Active
          </Link>
        </li>
        <li className="dropdown">
          <div
            className={`dropdown-toggle ${
              activeLink === "Strategies" ? "active" : ""
            }`}
            onClick={toggleDropdown}
          >
            {selectedStrategy} {/* Display the selected strategy */}
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <div
                  className={
                    location.pathname === "/Strategies/MyStrategies"
                      ? "active"
                      : ""
                  }
                  onClick={() => handleStrategySelect("My Strategies")}
                >
                  My Strategies
                </div>
              </li>
              <li>
                <div
                  className={
                    location.pathname === "/Strategies/Deployed" ? "active" : ""
                  }
                  onClick={() => handleStrategySelect("Deployed")}
                >
                  Deployed
                </div>
              </li>
              <li>
                <div
                  className={
                    location.pathname === "/Strategies/Active" ? "active" : ""
                  }
                  onClick={() => handleStrategySelect("Active")}
                >
                  Active
                </div>
              </li>
              <li>
                <div
                  className={
                    location.pathname === "/Strategies/Marketplace"
                      ? "active"
                      : ""
                  }
                  onClick={() => handleStrategySelect("Marketplace")}
                >
                  Marketplace
                </div>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/PaperTrading"
            className={activeLink === "Paper trading" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Paper trading
          </Link>
        </li>
        <li>
          <Link
            to="/home/broker"
            className={activeLink === "Broker" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Add Broker
          </Link>
        </li>
      </div>
      <div className="navbar-icons">
        <div className="icon-container" title="Logout">
          <Image
            src={Logout}
            height={23}
            className="logout-icon"
            onClick={logout}
          />
        </div>
        <button onClick={toggleDarkMode}>{darkMode ? "🌙" : "☀️"}</button>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
