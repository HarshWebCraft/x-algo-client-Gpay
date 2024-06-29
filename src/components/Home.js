import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from '../components/Dashboard/Dashboard'
import './Home.css'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import axios from 'axios';

function Home() {
    const location = useLocation()
    const userEmail = location.state?.userEmail || '';
    const [tourShown, setTourShown] = useState(false);

    // const theme = localStorage.setItem('theme',"light-theme")
    
    useEffect(() => {
        const data = async () => {
            try {
                console.log('home.js')
                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.classList.remove('modal-backdrop');
                }
                const response = await axios.post('https://x-algo-gpay.onrender.com/tour', { userEmail })
                if (response.data.tour) {
                    setTourShown(response.data);
                    driverObj.drive();
                }
            }
            catch (e) {
                console.log(e)
            }

            try{
                const mobileNoResponse = await axios.post('https://x-algo-gpay.onrender.com/mobileno', { userEmail })
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
            { element: '.a', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
            { element: '.aa', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
            { element: '.bb', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
            { element: '.cc', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
            { element: '.dd', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
            { element: '.ee', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
            { element: '.ff', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
        ]
    });

    return (
        <div className={localStorage.getItem("theme")=="light-theme" ? 'Home' : 'hfhvhjdbhjdbhdhbd'}>
            <div className='container'>


                <Navbar userEmail={userEmail} />
                <Dashboard userEmail={userEmail} />


            </div>
        </div>
    )
}

export default Home