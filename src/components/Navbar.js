import React, { useState } from 'react';
import { Nav, NavDropdown, Form, Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/logout';
import './navbar.css';
import UserIcon from './UserIcon';
import { useEffect } from 'react';
import axios from 'axios';

function Navbar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [newImg,setnewImg] = useState("") 
    
    const Logout = () => {
        dispatch(logout());
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };
    
    const userEmail = useSelector(state => state.email.email);

    useEffect(()=>{
        const data = async () => {
            try {
                const responce = await axios.post("https://x-algo-gpay.onrender.com/navbar", { userEmail })
                setnewImg(responce.data.img)
            }
            catch (e) {
                console.log(e)
            }
        }
        data()
    },[])
    
    function MyModalWithGrid(props) {
        const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme'));
        
        const handleThemeChange = (event) => {
            
            
            window.location.reload();
            setModalShow(false)
            setIsDarkMode(event.target.value);

            setTimeout(() => {
                localStorage.setItem('theme', event.target.value);

            }, 5);


        };

        useEffect(() => {
            const applyStyles = () => {
                const dropdownMenu = document.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.backgroundColor = "#16181b"; // Change this to the desired CSS property
                }
            };

            if (localStorage.getItem("theme") === "dark-theme") {
                applyStyles();

                // Observe changes in the DOM to apply styles to dynamically added elements
                const observer = new MutationObserver(applyStyles);
                observer.observe(document.body, { childList: true, subtree: true });

                // Clean up the observer on component unmount
                return () => observer.disconnect();
            }
        }, []);

        
        return (
            <Modal show={modalShow} {...props} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className={`grid-example1n ${localStorage.getItem('theme') === "light-theme" ? "cganriog" : "bcebcgyofbcgf"}`}>
                    <Container>
                        <Row className='col-12 p-0 m-2'>
                            <div className='text-center col-10'>Setting</div>
                            <button type="button" className="btn-close custom-close-btn" onClick={props.onHide} aria-label="Close"></button>
                        </Row>
                        <Row>
                            <Col xs={6} md={4}>
                                General
                            </Col>
                            <Col xs={12} md={8}>
                                Theme
                                <Form className='pe-4 dd m-2'>
                                    <Form.Check
                                        type="radio"
                                        label="Light Mode"
                                        value="light-theme"
                                        checked={isDarkMode === 'light-theme'}
                                        onChange={handleThemeChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Dark Mode"
                                        value="dark-theme"
                                        checked={isDarkMode === 'dark-theme'}
                                        onChange={handleThemeChange}
                                    />
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={8}>
                                etc
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <div className={`${localStorage.getItem('theme') === "light-theme" ? 'nav2' : 'ffddfavfvf'}`}>
            <Nav variant="pills">
                <Nav.Item className='pe-3 aa my-3 mx-2'>
                    <Nav.Link as={Link} to="/home" className={location.pathname === '/home' ? 'active' : ''}>Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item className='pe-3 bb my-3 mx-2'>
                    <Nav.Link as={Link} to="/Strategies" className={location.pathname === '/Strategies' || location.pathname === '/strategies/mystartegies' || location.pathname === '/strategies/deployed' || location.pathname === '/strategies/marketplace' ? 'active' : ''}>Strategies</Nav.Link>
                </Nav.Item>
                <Nav.Item className='pe-3 cc my-3 mx-2'>
                    <Nav.Link as={Link} to="/Papertrading" className={location.pathname === '/Papertrading' ? 'active' : ''}>Paper Trading</Nav.Link>
                </Nav.Item>
                <Nav.Item className='pe-3 dd my-3 mx-2'>
                    <Nav.Link as={Link} to='/services' className={location.pathname === '/services' ? 'active' : ''}>Services</Nav.Link>
                </Nav.Item>
                <Nav.Item className='pe-3 dd my-3 mx-2'>
                    { newImg ? 
                    <img src={newImg} className='shgdjasgdjbkachkdbcd'/> 
                    : 
                    (<UserIcon userName={userEmail} />)
                    }
                </Nav.Item>
                <Nav.Item className={`pe-3 dd my-3 mx-2`}>
                    <NavDropdown title="User Details" id="nav-dropdown" className={`aaaaaaaa ${localStorage.getItem('theme') == "light-theme" ? '' : 'bhvbfhvjbv'}`}>
                        <div className={`${localStorage.getItem('theme') == "light-theme" ? '' : 'bhvbfhvjbv'}`}>
                            <NavDropdown.Item as={Link} to="/profile" className={`${location.pathname === '/profile' ? 'active ' : ''}` + `${localStorage.getItem('theme') === "light-theme" ? '' : 'jhsbdvhjsbdsdb'}`}>Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/home/broker' className={`${location.pathname === '/home/broker' ? 'active ' : ''}` + `${localStorage.getItem('theme') === "light-theme" ? '' : 'jhsbdvhjsbdsdb'}`}>Broker</NavDropdown.Item>
                            <NavDropdown.Item className={`${location.pathname === '/' ? 'active' : ''}` + `${localStorage.getItem('theme') === "light-theme" ? '' : 'jhsbdvhjsbdsdb'}`}>Something else here</NavDropdown.Item>
                            <NavDropdown.Item className={`btn ${localStorage.getItem('theme') === "light-theme" ? '' : 'jhsbdvhjsbdsdb'}`} onClick={() => setModalShow(true)}>Setting</NavDropdown.Item>
                            <NavDropdown.Item onClick={Logout} className={`${localStorage.getItem('theme') === "light-theme" ? '' : 'jhsbdvhjsbdsdb'}`}>Logout</NavDropdown.Item>
                        </div>
                    </NavDropdown>
                </Nav.Item>
            </Nav>
            <MyModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}

export default Navbar;
