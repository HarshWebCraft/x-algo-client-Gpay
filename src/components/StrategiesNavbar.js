import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './strategiesnavbar.css';

function StrategiesNavbar(){
    const location = useLocation();
    return(
        <div>
            <Nav className= {`col-6 center-div ${localStorage.getItem('theme') === "light-theme" ? 'nav2' : 'sxdcgfvhbj'}`}>
                <Nav.Item className='pe-5 m-3'>
                    <Nav.Link as={Link} to="/strategies/mystartegies" className={location.pathname === '/strategies/mystartegies' ? 'active' : ''}>My Strategies</Nav.Link>
                </Nav.Item>
                <Nav.Item className='pe-5 m-3'>
                    <Nav.Link as={Link} to="/strategies/deployed" className={location.pathname === '/strategies/deployed' ? 'active' : ''}>Deployed</Nav.Link>
                </Nav.Item>
                <Nav.Item className='pe-5 m-3'>
                    <Nav.Link as={Link} to="/strategies/marketplace" className={location.pathname === '/strategies/marketplace' ? 'active' : ''}>Market Place</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
export default StrategiesNavbar