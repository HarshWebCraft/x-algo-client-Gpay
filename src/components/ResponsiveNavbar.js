import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./ResponsiveNavbar.css"; 

const ResponsiveNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`${localStorage.getItem('theme') === "light-theme" ? 'nav2' : ''}`}>
    <nav>
      
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/services">Strategies</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Paper Trading</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Services</NavLink>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default ResponsiveNavbar;
