import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import StrategiesNavbar from "./StrategiesNavbar"
import { Button, Dropdown, Form, Nav, NavDropdown } from 'react-bootstrap'
import './deployed.css'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { userSchemaRedux } from "../actions/actions"
import React from 'react'

function Deployed() {
    const [accountid, setaccountid] = useState('')
    const [applieddate, setapplieddate] = useState('')
    const [totaltrades, settotaltrades] = useState('')
    const [pl, setpl] = useState('');
    const userSchema = useSelector(state => state.account.userSchemaRedux);
    const Email = useSelector(state => state.email.email)
    const dispatch = useDispatch();
    const url = process.env.NODE_ENV === "production" 
    ? "https://x-algo-gpay.onrender.com" 
    : "http://localhost:5000";
    const Deployed=userSchema.DeployedData;
    useEffect(()=>{
        console.log(Deployed)
    },[])

    const removeDeployed=async(id)=>{
        const response=await axios.post(`${url}/removeDeployed`,{Email,id})
        dispatch(userSchemaRedux(response.data))
    }

    React.useEffect(() => {
        document.body.className = `${localStorage.getItem('theme')}`;
    }, [])


    return (
        <div className="container">
            <Navbar />
            <StrategiesNavbar />
            {Deployed.map((item)=>{
                return(
            <div className='row col-10 nays center-div'>
                <div className='row'>
                    <div className='col-3 nays'>{item.Strategy}</div>
                </div>
                <div className='row nays'>
                    <div className='col-12'>
                        <p>Account Id:{item.Account}</p>
                        <p>Applied Date:{item.AppliedDate}</p>
                        <p>Total Trades:</p>
                        <p>Total P&L:</p>
                    </div>
                </div>
                <div className='col-12 m-3 d-flex justify-content-end'>
                    <button className="btn col-2 btn-danger button"  onClick={() => removeDeployed(item.Strategy)}>Remove</button>
                </div>
            </div>
                )
            })}
        </div>
    )
}
export default Deployed