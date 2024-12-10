import React, { useState } from "react";
import {
  FaUser,
  FaExchangeAlt,
  FaChartLine,
  FaGift,
  FaInfoCircle,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";
import Navbar from "./Navbar";
import "./profile.css";
import profile from "../images/profile.png";
import { useSelector } from "react-redux";
import TransactionList from "./TransactionList.js";

function Profile({ darkMode, toggleDarkMode }) {
  const [activeSection, setActiveSection] = useState("Profile"); // State for active section
  const Email = useSelector((state) => state.email.email);

  const transactions = [
    {
      name: "William Mardoch",
      date: "21 March 2021",
      invoiceId: "OP01214784",
      amount: "$250 USD",
      status: "Receive",
    },
    {
      name: "Jack Dawson",
      date: "20 March 2021",
      invoiceId: "OP01214784",
      amount: "-$20 USD",
      status: "Transfer",
    },
    {
      name: "Mailchimp",
      date: "19 March 2021",
      invoiceId: "OP87452148",
      amount: "-$80 USD",
      status: "Payment",
    },
    {
      name: "Fiverr",
      date: "18 March 2021",
      invoiceId: "OP32201425",
      amount: "$100 USD",
      status: "Receive",
    },
    {
      name: "BANK OF AMERICA LTD.",
      date: "19 March 2021",
      invoiceId: "OP34012458",
      amount: "$210 USD",
      status: "Withdraw",
    },
    {
      name: "Peter Jacky",
      date: "12 March 2021",
      invoiceId: "OP82145784",
      amount: "-$80 USD",
      status: "Payment",
    },
    {
      name: "EBL Credit Card",
      date: "10 March 2021",
      invoiceId: "OP21547895",
      amount: "$160 USD",
      status: "Deposit",
    },
    {
      name: "Angelina Juli",
      date: "05 March 2021",
      invoiceId: "OP21547854",
      amount: "$100 USD",
      status: "Receive",
    },
    {
      name: "David William",
      date: "05 March 2021",
      invoiceId: "OP21547854",
      amount: "$100 USD",
      status: "Receive",
    },
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section); // Change active section based on user click
  };

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="profile">
        <div className="profile-sidebar">
          <ul>
            <li
              className={`sidebar-item ${
                activeSection === "Profile" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("Profile")}
            >
              <FaUser className="sidebar-icon" />
              <span className="sidebar-text">Profile</span>
            </li>
            <li
              className={`sidebar-item ${
                activeSection === "Transaction" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("Transaction")}
            >
              <FaExchangeAlt className="sidebar-icon" />
              <span className="sidebar-text">Transaction</span>
            </li>
            <li className="sidebar-item">
              <FaChartLine className="sidebar-icon" />
              <span className="sidebar-text">Analytics</span>
            </li>
            <li className="sidebar-item">
              <FaGift className="sidebar-icon" />
              <span className="sidebar-text">Referral</span>
            </li>
            <li className="sidebar-item">
              <FaInfoCircle className="sidebar-icon" />
              <span className="sidebar-text">Terms & Conditions</span>
            </li>
            <li className="sidebar-item">
              <FaLifeRing className="sidebar-icon" />
              <span className="sidebar-text">Help & Support</span>
            </li>
            <li className="sidebar-item">
              <FaSignOutAlt className="sidebar-icon" />
              <span className="sidebar-text">Logout</span>
            </li>
          </ul>
        </div>

        {/* Conditional Rendering for Profile and Transaction */}
        <div className="profile-second">
          {activeSection === "Profile" && (
            <div className="profile-right-first">
              <div className="user-image">
                {/* Replace with actual image URL */}
                <img src={profile} height="100px" alt="User" />
              </div>
              <div className="user-info">
                <div className="user-info-first">
                  <div style={{ width: "50%" }}>Username: </div>
                  <div style={{ width: "50%" }}>Email: {Email}</div>
                </div>
                <div className="user-info-second">
                  <div style={{ width: "50%" }}>Account Type: Premium</div>
                  <div style={{ width: "50%" }}>Member Since: January 2022</div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Transaction" && (
            <div className="transaction-info">
              <h3>Transaction History</h3>
              <TransactionList transactions={transactions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
