import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import First from "./components/First";
import Home from "./components/Home";
import Broker from "./components/Broker";
import { useSelector } from "react-redux";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Strategies from "./components/Strategies";
import Profile from "./components/Profile";
import HowToAdd from "./components/HowToAdd";
import Verifyemail from "./components/Verifyemail";
import PaperTrading from "./components/PaperTrading";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRoute2 from "./components/PrivateRoute2";
import ResetPassword from "./components/ResetPassword";
import ForgetPassword from "./components/ForgetPassword";
import MyStartegies from "./components/MyStartegies";
import Deployed from "./components/Deployed";
import MarketPlace from "./components/MarketPlace";
import Otpverify from "./components/Otpverify";
import TermsCondistion from "./components/TermsCondistion";
import Refund from "./components/Refund";
import PrivacyPolicy from "./components/Privacypolicy";
import MyWallet from "./components/MyWallet";
import New_Signup from "./components/New_Signup";
import New_Signin from "./components/New_Signin";
import Navbar from "./components/Navbar";
import AddMarketPlaceData from "./components/AddMarketPlaceData";

function App() {
  const isAuth = useSelector((state) => state.account.auth);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light"); // Save new theme in localStorage
      return newMode;
    });
  };

  useEffect(() => {
    // Set initial theme based on localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    }
  }, []);

  return (
    <div className={`App app ${darkMode ? "dark" : "light"}`}>
      {loading && (
        <div className="loader2 ">
          <div className="loader ">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/contactus"
          exact
          element={<ContactUs setLoading={setLoading} />}
        />
        <Route
          path="/about"
          exact
          element={<AboutUs setLoading={setLoading} />}
        />
        <Route
          path="/termcondistion"
          exact
          element={<TermsCondistion setLoading={setLoading} />}
        />
        <Route
          path="/refund"
          exact
          element={<Refund setLoading={setLoading} />}
        />
        <Route
          path="/privacypolicy"
          exact
          element={<PrivacyPolicy setLoading={setLoading} />}
        />
        <Route
          path="/login"
          exact
          element={<New_Signin setLoading={setLoading} />}
        />
        <Route
          path="/signup"
          exact
          element={<New_Signup setLoading={setLoading} />}
        />
        <Route
          path="/addMarketPlaceStra"
          exact
          element={<AddMarketPlaceData setLoading={setLoading} />}
        />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute2>
              <First setLoading={setLoading} />
            </PrivateRoute2>
          }
        />
        <Route
          exact
          path="/home"
          element={
            <PrivateRoute>
              <Home
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/broker"
          exact
          element={
            <PrivateRoute>
              <Broker
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/myWallet"
          exact
          element={
            <PrivateRoute>
              <MyWallet
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/Papertrading"
          exact
          element={
            <PrivateRoute>
              <PaperTrading
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/services"
          exact
          element={
            <PrivateRoute>
              <Services
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/strategies"
          exact
          element={
            <PrivateRoute>
              <Strategies
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          exact
          element={
            <PrivateRoute>
              <Profile
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/helpToadd"
          exact
          element={
            <PrivateRoute>
              <HowToAdd setLoading={setLoading} />
            </PrivateRoute>
          }
        />
        <Route
          path="/verify-email"
          exact
          element={<Verifyemail setLoading={setLoading} />}
        />
        <Route
          path="/otp-verify"
          exact
          element={<Otpverify setLoading={setLoading} />}
        />
        <Route
          path="/resetPassword"
          exact
          element={<ResetPassword setLoading={setLoading} />}
        />
        <Route
          path="/forgetPassword"
          exact
          element={<ForgetPassword setLoading={setLoading} />}
        />
        <Route
          path="/strategies/mystartegies"
          exact
          element={
            <PrivateRoute>
              <MyStartegies setLoading={setLoading} />
            </PrivateRoute>
          }
        />
        <Route
          path="/strategies/deployed"
          exact
          element={
            <PrivateRoute>
              <Deployed setLoading={setLoading} />
            </PrivateRoute>
          }
        />
        <Route
          path="/strategies/marketplace"
          exact
          element={
            <PrivateRoute>
              <MarketPlace
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setLoading={setLoading}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
