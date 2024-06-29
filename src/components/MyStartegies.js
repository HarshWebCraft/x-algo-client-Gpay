import Navbar from "./Navbar"
import StrategiesNavbar from "./StrategiesNavbar"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Form, Nav, NavDropdown } from 'react-bootstrap'
import './mystartegies.css'
import jsonData from './marketPlace.json'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userSchemaRedux } from "../actions/actions";
import React from 'react'

function MyStartegies() {
    const [Quaninty, setQuaninty] = useState("")
    const [Index, setIndex] = useState("")
    const [Account, setAccount] = useState("")
    const [filteredData, setFilteredData] = useState([]);
    const userSchema = useSelector(state => state.account.userSchemaRedux)
    const ids = userSchema.MyStartegies;
    const Email = useSelector(state => state.email.email)
    const dispatch = useDispatch();
    useEffect(() => {
        
        
        const filteredData = jsonData.filter(item => ids.includes(item.id));
        console.log(filteredData)
        setFilteredData(filteredData); 
    },[userSchema])

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        if (field === 'Quaninty') {
            setQuaninty(value);
        } else if (field === 'Index') {
            setIndex(value);
        } else if (field === 'Account') {
            setAccount(value);
        }
    };

    const removeMyStrategies=async(index)=>{
        const response=await axios.post('http://localhost:5000/removeMyStra',{Email,index})
        console.log(response.data)
        dispatch(userSchemaRedux(response.data))
    }

    const addDeployed=async(id)=>{
        const response=await axios.post('http://localhost:5000/addDeployed',{Email , id , Quaninty , Index , Account});
        console.log("this is upadted"+response.data)
        dispatch(userSchemaRedux(response.data))
    }

    React.useEffect(() => {
        document.body.className = `${localStorage.getItem('theme')}`;
    }, [])

    return (
        <div className="container">
            <Navbar />
            <StrategiesNavbar />
            {filteredData.map(strategy => (
                <div className='row col-10 nays center-div' key={strategy.id}>
                    <div className='row'>
                        <div className='col-3 nays'>{strategy.name}</div>
                        <div className='col-7 '></div>
                        <div className='btn col-2 btn-danger nays' onClick={() => removeMyStrategies(strategy.id)}>Unsubscribe</div>
                    </div>
                    <div className='row nays'>
                        <div className='col-12'>
                            {strategy.content}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '></div>
                        <div className='col-7 '></div>
                        <div className="col-12 m-3 d-flex justify-content-end">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#exampleModalCenter${strategy.id}`}>
                                Apply
                            </button>

                            <div className="modal fade" id={`exampleModalCenter${strategy.id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalCenterTitle${strategy.id}`} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content tyhgcv">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
                                                    <label className='selectbroker'></label>
                                                    <input className='d-flex passField m-auto mt-3'
                                                        type="text"
                                                        placeholder="Quaninty"
                                                        value={Quaninty}
                                                        onChange={(e) => setQuaninty(e.target.value)}
                                                        required
                                                    />
                                                    <input className='d-flex passField m-auto mt-3'
                                                        type="text"
                                                        placeholder="Index"
                                                        value={Index}
                                                        onChange={(e) => setIndex(e.target.value)}
                                                        required
                                                    />
                                                    <input className='d-flex passField m-auto mt-3'
                                                        type="text"
                                                        placeholder="Account"
                                                        value={Account}
                                                        onChange={(e) => setAccount(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={() => addDeployed(strategy.id)}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MyStartegies