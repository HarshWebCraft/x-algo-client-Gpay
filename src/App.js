import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import First from './components/First';
import VantaGlobe from './components/VantaGlobe';
import Home from './components/Home';
import Broker from './components/Broker';
import { useSelector } from 'react-redux';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Strategies from './components/Strategies';
import Profile from './components/Profile';
import HowToAdd from './components/HowToAdd';
import Verifyemail from './components/Verifyemail';
import PaperTrading from './components/PaperTrading';
import PrivateRoute from './components/PrivateRoute';
import PrivateRoute2 from './components/PrivateRoute2';
import ResetPassword from './components/ResetPassword';
import ForgetPassword from './components/ForgetPassword';
import MyStartegies from './components/MyStartegies';
import Deployed from './components/Deployed';
import MarketPlace from './components/MarketPlace';
import Otpverify from './components/Otpverify';
import TermsCondistion from './components/TermsCondistion';
import Refund from './components/Refund'
import PrivacyPolicy from './components/Privacypolicy'
import MyWallet from './components/MyWallet';
import New_Signup from './components/New_Signup';
import New_Signin from './components/New_Signin';
import Navbar from './components/Navbar';


function App() {
  const isAuth = useSelector(state => state.account.auth);
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  React.useEffect(() => {
    if (localStorage.getItem('theme') == null) {
      localStorage.setItem('theme', "light-theme")
    }
  }, [])

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (


    // <div className={localStorage.getItem('theme')=="light-theme" ? 'App' : 'hfhvhjdbhjdbhdhbd'}>
    <div className={`App app ${darkMode ? 'dark' : 'light'}`}>
      <Routes>


        <Route path='/contactus' exact element={<ContactUs />} />
        <Route path='/about' exact element={<AboutUs />} />
        <Route path='/termcondistion' exact element={<TermsCondistion/>} />
        <Route path='/refund' exact element={<Refund/>} />
        <Route path='/privacypolicy' exact element={<PrivacyPolicy/>} />
        <Route path='/login' exact element={<New_Signin/>}/>
        <Route path='/signup' exact element={<New_Signup/>}/>
        <Route exact path='/' element={
          <PrivateRoute2>
            <First />
          </PrivateRoute2>
        } />
        <Route exact path='/home' element={
          <PrivateRoute>
            <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </PrivateRoute>
        } />
        <Route path='/home/broker' exact element={
          <PrivateRoute>
            <Broker darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </PrivateRoute>
        } />
        <Route path='/home/myWallet' exact element={
          <PrivateRoute>
            <MyWallet  darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </PrivateRoute>
        } />
        <Route path='/Papertrading' exact element={
          <PrivateRoute>
            <PaperTrading darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </PrivateRoute>
        } />
        <Route path='/services' exact element={
          <PrivateRoute>
            <Services darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </PrivateRoute>
        } />
        <Route path='/strategies' exact element={
          <PrivateRoute>
            <Strategies darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </PrivateRoute>
        } />
        <Route path='/profile' exact element={
          <PrivateRoute>
            <Profile darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </PrivateRoute>
        } />
        <Route path='/helpToadd' exact element={
          <PrivateRoute>
            <HowToAdd />
          </PrivateRoute>
        } />
        <Route path='/verify-email' exact element={

          <Verifyemail />

        } />
        <Route path='/otp-verify' exact element={

          <Otpverify />

        } />
        <Route path='/resetPassword' exact element={

          <ResetPassword />

        } />
        <Route path='/forgetPassword' exact element={

          <ForgetPassword />

        } />
        <Route path='/strategies/mystartegies' exact element={
          <PrivateRoute>
            <MyStartegies />
          </PrivateRoute>
        } />
        <Route path='/strategies/deployed' exact element={
          <PrivateRoute>
            <Deployed />
          </PrivateRoute>
        } />
        <Route path='/strategies/marketplace' exact element={
          <PrivateRoute>
            <MarketPlace  darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </PrivateRoute>
        } />
      
      </Routes>


    </div>
  );
}

export default App;