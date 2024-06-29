import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, angelId, deleteBroker, addItem, removeItem, brokerLogin, userSchemaRedux, allClientData } from '../actions/actions';
import { UseSelector } from 'react-redux';
import './broker.css'
import './loader.css'
import { Button, Dropdown, Form, Nav, NavDropdown } from 'react-bootstrap'
import axios from 'axios';
import delete_broker from '../images/delete_broker.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../actions/logout';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import { Triangle } from 'react-loader-spinner';

function Listofbroker() {

    const userSchema = useSelector(state => state.account.userSchemaRedux)
    const clientdata = useSelector(state => state.account.allClientData)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const email = useSelector(state => state.email.email)
    const items = useSelector(state => state.account.items)
    // const items = items1[0]
    const Email = useSelector(state => state.email.email)
    let userExist = false
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertMessage2, setAlertMessage2] = useState('');
    const [id, insertid] = useState('');
    const [pass, insertpass] = useState('');
    const checklogin = true
    const [loading, setLoading] = useState(false);
    const [broker, addbroker] = useState('');
    const [secretKey, insertSecretKey] = useState('');
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [addedId, insertaddedId] = useState('');
    const [apikey, insertApiKey] = useState('');

    useEffect(() => {

        const fetchData = async () => {

            console.log(userSchema)
            console.log(clientdata)
            // const response = await axios.post('https://x-algo-gpay.onrender.com/checkBroker', { Email: email });
            // setisLoggedIn(response.data.success)

        }
        fetchData()
    }, [email, userSchema])

    const showAlertWithTimeout = (message, duration) => {
        setShowAlert(true);
        setAlertMessage(message);

        setTimeout(() => {
            setShowAlert(false);
            setAlertMessage('');
        }, duration);
    };

    const showAlertWithTimeout2 = (message, duration) => {
        setShowAlert2(true);
        setAlertMessage2(message);

        setTimeout(() => {
            setShowAlert2(false);
            setAlertMessage2('');
        }, duration);
    };

    const f1 = async (e) => {
        setLoading(true);
        document.body.style.overflow = 'hidden';
        userSchema.BrokerData.map((item, index) => {
            if (item.AngelId == id) {
                userExist = true
            }

        })

        if (userExist) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Broker already added",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            e.preventDefault();
            console.log("broker add")
            try {

                const response = await axios.post('https://x-algo-gpay.onrender.com/addbroker', { First: true, id: id, pass: pass, email: email, secretKey: secretKey, userSchema: userSchema ,ApiKey:apikey});

                console.log("when user enter angelid and pass" + response.data)
                if (!response.data) {

                    showAlertWithTimeout('Invalid id or password', 5000);
                    insertid('');
                    insertpass('');
                }
                else {

                    dispatch(loginSuccess(response));
                    dispatch(angelId({ id, pass }))
                    addbroker()

                    // dispatch(addItem(id))
                    console.log(response.data.userSchema)
                    const dbschema = await axios.post('https://x-algo-gpay.onrender.com/dbSchema', { Email })
                    const profileData = await axios.post('https://x-algo-gpay.onrender.com/userinfo', { Email })
                    dispatch(allClientData(profileData.data))
                    showAlertWithTimeout2('Successfully added', 3000);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Account added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    dispatch(userSchemaRedux(dbschema.data))
                    if (dbschema.data.BrokerCount) { dispatch(brokerLogin(true)) }
                    else { dispatch(brokerLogin(false)) }

                    insertaddedId(id)
                    insertid('');
                    insertpass('');
                    insertSecretKey('')
                    setisLoggedIn(true)

                    console.log("user data is " + response.data.data.net);

                }
            } catch (e) {
                console.log("Error is " + e)
            }
            setLoading(false);
            document.body.style.overflow = 'unset';
            console.log(broker)
        }
    }

    const delete_broker_fun = async (index) => {

        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirmation.isConfirmed) {
            try {
                const response = await axios.post('https://x-algo-gpay.onrender.com/removeClient', { Email, index });
                const profileData = await axios.post('https://x-algo-gpay.onrender.com/userinfo', { Email })
                dispatch(allClientData(profileData.data))
                const dbschema = await axios.post('https://x-algo-gpay.onrender.com/dbSchema', { Email })
                dispatch(userSchemaRedux(dbschema.data))
                console.log(response.data)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Account removed successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                setisLoggedIn(false);
                dispatch(brokerLogin(false));
                dispatch(logout());
                dispatch(removeItem());
                showAlertWithTimeout2('Broker removed successfully', 3000);
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to remove broker",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        }


    };

    if(localStorage.getItem('theme')=="dark-theme"){
        document.body.className="dark-theme"
    }

    const help = () => {
        navigate('/home')
    }
    return (
        <div className={`container ${localStorage.getItem('theme')=="light-theme"?"":"jkcdsbhchasd"}`} >

            <div className={`${showAlert ? ' alert alert-danger show mt-4' : ''}`}>
                {alertMessage}
            </div>
            <div className={`${showAlert2 ? ' alert alert-success show mt-4' : ''}`}>
                {alertMessage2}
            </div>



            {loading &&
                <div className='loader2 uytr'>
                    <div className="loader liop">

                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__ball"></div>
                    </div>
                </div>

                // <div className='uytr'>
                //     <div className='liop'>
                //         <Triangle
                //             visible={true}   
                //             height="100"
                //             width="100"
                //             color="blue"
                //             ariaLabel="triangle-loading"
                //             wrapperStyle={{}}
                //             wrapperClass=""
                //         />
                //     </div>
                // </div>

            }

            <div className={`broker-list mt-5 p-2 ${localStorage.getItem('theme')=="light-theme"?"":"hvbhbjhvsvsdvd"}`}>
                <div className='row'>
                    <div className={`col-12 p-2 ps-4 d-flex align-items-start flex-column`}>
                        <span className='list-title mt-3 ms-2 ' style={{ fontSize: 35 }}>List of brokers</span><br></br>
                        <div className="container">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'hvbhbjhvsvsdvd'}`}>Client Id</th>
                                            <th className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'hvbhbjhvsvsdvd'}`} >Name</th>
                                            <th className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'hvbhbjhvsvsdvd'}`} >BrokerName</th>
                                            {/* <th>Exchanges</th> */}
                                            <th className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'hvbhbjhvsvsdvd'}`} >Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientdata.map((item, index) => (
                                            <tr key={index}>
                                                <td className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'hvbhbjhvsvsdvd'}`} >{item.userData.data.clientcode}</td>
                                                <td className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'hvbhbjhvsvsdvd'}`} style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{(item.userData.data.name).toUpperCase()}</td>
                                                <td className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'hvbhbjhvsvsdvd'}`} >AngelOne</td>
                                                {/* <td style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.userData.data.exchanges}</td> */}
                                                <td className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'hvbhbjhvsvsdvd'}`} ><img src={delete_broker} height={20} className="delete-icon" onClick={(e) => { delete_broker_fun(index) }} alt="Delete" /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>



                    </div>
                    <div className='col-12'></div>


                </div>

            </div>
            <div className={`mb-5 mt-5 p-2 ${localStorage.getItem('theme')=="light-theme"?"addbroker":"edsedseddesefergerg"}`}>
                <div className='row'>
                    <span className='col-12 d-flex p-2 ps-4 amxjy addbrokertitle'>Add broker</span>
                    <div className='col-12'>
                        <Form onSubmit={f1}>




                            <select name="" id="" className='p-2 bg-primary  outline-none rounded-3 mt-4 d-flex ms-3 text-white'>
                                {/* <option value="">Select Broker </option> */}
                                <option value="AngleOne">Angel One</option>


                            </select>



                            <Form.Group>
                                <Form.Label className='selectbroker'></Form.Label>
                                <Form.Control className={`d-flex passField m-auto mt-3 ${localStorage.getItem
                                ('theme')=="light-theme"?"":"agjvdfdcusacfbd"}`}
                                    type="text"
                                    placeholder="Id"
                                    value={id}
                                    onChange={(e) => { insertid(e.target.value) }}

                                    required
                                />
                                <Form.Control className={`d-flex passField m-auto mt-3 ${localStorage.getItem
                                ('theme')=="light-theme"?"":"agjvdfdcusacfbd"}`}
                                    type="text"
                                    placeholder="PIN"
                                    value={pass}
                                    onChange={(e) => { insertpass(e.target.value) }}
                                    required
                                />
                                <Form.Control className={`d-flex passField m-auto mt-3 ${localStorage.getItem
                                ('theme')=="light-theme"?"":"agjvdfdcusacfbd"}`}
                                    type="text"
                                    placeholder="Totp key"
                                    value={secretKey}
                                    onChange={(e) => { insertSecretKey(e.target.value) }}
                                    required
                                />
                                <Form.Control className={`d-flex passField m-auto mt-3 ${localStorage.getItem
                                ('theme')=="light-theme"?"":"agjvdfdcusacfbd"}`}
                                    type="text"
                                    placeholder="Api Key"
                                    value={apikey}
                                    onChange={(e) => { insertApiKey(e.target.value) }}
                                    required
                                />
                                {/* <div className='fdhn'>
                                <a href='http://localhost:3000/helpToAdd' target='__blank' className='help'>Don't know Totp Key <br/>Click here</a>
                                </div> */}
                                <div className='bubble'>
                                    <Link to={'http://localhost:3000/helpToAdd'} target='__blank' className='help'>
                                        Don't know Totp Key <br />Click here
                                    </Link>
                                </div>
                                <div className='bubble1'></div>
                            </Form.Group>
                            <Button variant="primary mt-3" type="submit">
                                Add
                            </Button>

                        </Form>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Listofbroker
export const id = () => id
export const pass = () => pass




