import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from '../components/Dashboard/Dashboard'
import './Home.css'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import axios from 'axios';
import ResponsiveNavbar from './ResponsiveNavbar';

function Home({ darkMode, toggleDarkMode }) {
    const location = useLocation()
    const userEmail = location.state?.userEmail || '';
    const [tourShown, setTourShown] = useState(false);

    const url = process.env.NODE_ENV === "production" 
    ? "https://x-algo-gpay.onrender.com" 
    : "http://localhost:5000";

    // const theme = localStorage.setItem('theme',"light-theme")
    
    useEffect(() => {
        const data = async () => {
            try {
                console.log('home.js')
                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.classList.remove('modal-backdrop');
                }
                const response = await axios.post(`${url}/tour`, { userEmail })
                if (response.data.tour) {
                    setTourShown(response.data);
                    driverObj.drive();
                }
            }
            catch (e) {
                console.log(e)
            }

            try{
                const mobileNoResponse = await axios.post(`${url}/mobileno`, { userEmail })
                console.log("[][][][][[[][][][][]=====>"+mobileNoResponse)
                if(mobileNoResponse.data.mobileNumber){
                    alert("enter mobile number")
                }
            }
            catch(err){
                console.log(err)
            }
        }

        data()
    }, []);

    React.useEffect(() => {
        document.body.className = `${localStorage.getItem('theme')}`;
    }, [])

    const driverObj = driver({
        showProgress: true,
        popoverClass: 'driverjs-theme',
        steps: [
            { element: '.a', popover: { title: "Welcome", description: "--", side: "left", align: 'start' } },
            { element: '.aa', popover: { title: "Dashbord", description: "--", side: "left", align: 'start' } },
            { element: '.bb', popover: { title: "Strategies", description: "--", side: "left", align: 'start' } },
            { element: '.cc', popover: { title: "Paper Trading", description: "--", side: "left", align: 'start' } },
            { element: '.dd', popover: { title: "Services", description: "--", side: "left", align: 'start' } },
            { element: '.ee', popover: { title: "Profile Image", description: "--", side: "left", align: 'start' } },
            { element: '.ff', popover: { title: "Setting", description: "--", side: "left", align: 'start' } },
        ]
    });

    return (
        <div className={localStorage.getItem("theme")=="light-theme" ? 'Home' : 'hfhvhjdbhjdbhdhbd'}>
            <div >


                <Navbar userEmail={userEmail}  darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
                {/* <ResponsiveNavbar/> */}
                <Dashboard userEmail={userEmail} darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>


            </div>
        </div>
    )
}

export default Home