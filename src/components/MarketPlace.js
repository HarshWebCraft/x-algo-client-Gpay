import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import StrategiesNavbar from "./StrategiesNavbar";
import './marketplace.css';
import marketplacedata from './marketPlace.json';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userSchemaRedux } from "../actions/actions";
import { useLocation } from 'react-router-dom';

function MarketPlace() {
    const Email = useSelector(state => state.email.email);
    const dispatch = useDispatch();
    const location = useLocation()
    const [filteredStrategies, setFilteredStrategies] = useState([]);

    const url = process.env.NODE_ENV === "production" 
    ? "https://x-algo-gpay.onrender.com" 
    : "http://localhost:5000";

    // const [amount,setamount] = useState(500000000)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${url}/mystartegies`, { Email });

                const myStartegies = response.data.mystartegies;
                const notMyStartegies = marketplacedata || [];

                const filteredStrategies = notMyStartegies.filter(item => !myStartegies.includes(item.id));
                
                setFilteredStrategies(filteredStrategies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const addMyStrategies = async (index) => {
        try {
            const response = await axios.post(`${url}/addmystra`, { Email, index, amount: 500, currency: "INR" }); // assuming amount is 500 for example
            console.log(response.data.order);
            const options = {
                key: "rzp_test_KZMNFXrpzK70CD",
                amount: response.data.order.amount,
                currency: response.data.order.currency,
                name: "X-Algo",
                description: "Test Transaction",
                order_id: response.data.order.id,
                handler: async (response) => {
                    try {
                        const verification = await axios.post(`${url}/verify-payment`, {
                            Email,
                            index,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        if (verification.data) {
                            window.location.reload();
                        } else {
                            alert("Payment failed");
                            window.location.reload();
                        }
                    } catch (error) {
                        console.error('Error verifying payment:', error);
                    }
                },
                prefill: {
                    name: `${response.data.Name}`,
                    email: `${response.data.Email}`,
                    contact: `${response.data.MobileNo}`
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#0000FF"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    React.useEffect(() => {
        document.body.className = `${localStorage.getItem('theme')}`;
    }, [])

    return (
        <div className="container">
            <Navbar />
            <StrategiesNavbar />
            {filteredStrategies.map(strategy => (
                <div className={`${localStorage.getItem('theme') == "light-theme" ? "'row col-10 nays center-div'" : "row col-10 nays center-div vgjsdbhcd"}`} key={strategy.id}>
                    <div className='row'>
                        <div className='col-3 nays'>{strategy.name}</div>
                        <div className='col-7'></div>
                        <div className='btn col-2 btn-primary nays' id="ajsgdhagsdhabsnamaafarefse" onClick={() => addMyStrategies(strategy.id)}>Subscribe</div>
                    </div>
                    <div className='row nays'>
                        <div className='col-12'>
                            {strategy.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MarketPlace;
