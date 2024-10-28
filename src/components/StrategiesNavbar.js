import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './strategiesnavbar.css';

function StrategiesNavbar(){
    const location = useLocation();
    return(
        <div className='container wsdcik'>
            <Nav className= {`col-7 center-div2 ${localStorage.getItem('theme') === "light-theme" ? '' : 'sxdcgfvhbj'}`}>
                <Nav.Item className='col-3 my-3 mx-2 center-div2'>
                    <Nav.Link as={Link} to="/strategies/mystartegies" className={location.pathname === '/strategies/mystartegies' ? 'active' : ''}>My Strategies</Nav.Link>
                </Nav.Item>
                <Nav.Item className='col-3 my-3 mx-2 center-div2'>
                    <Nav.Link as={Link} to="/strategies/deployed" className={location.pathname === '/strategies/deployed' ? 'active' : ''}>Deployed</Nav.Link>
                </Nav.Item>
                <Nav.Item className='col-3 my-3 mx-2 center-div2'>
                    <Nav.Link as={Link} to="/strategies/marketplace" className={location.pathname === '/strategies/marketplace' ? 'active' : ''}>Market Place</Nav.Link>
                </Nav.Item>
            </Nav>
            
        </div>
    )
}
export default StrategiesNavbar