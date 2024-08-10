import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './Dashboard/dashboard.css'
import data from '../../../server/websocket/data.json'
import { Dropdown, DropdownButton, Nav } from 'react-bootstrap'
import axios from 'axios';
function Strategies() {

  useEffect(()=>{
    const now = new Date();
    const minute=now.getMinutes
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, minute, 59); // 09:59:59

    // Calculate the time until the target time
    let timeUntilTarget = targetTime - now;
    
    if (timeUntilTarget < 0) {
      // If the target time has already passed for today, schedule it for the next day
      targetTime.setDate(targetTime.getDate() + 1);
      timeUntilTarget = targetTime - now;
    }

    // Schedule the task
    const timerId = setTimeout(async() => {

      const response2=await axios.post('http://localhost:5000/getSymbol');
      console.log(response2.data)

      console.log("Code executed at 09:59:59");

    }, timeUntilTarget);
  })

  const [value, setValue] = useState('NIFTY');

  const handleChange = (event) => {
 
    setValue(prevSelectedValues => [...prevSelectedValues, event.target.value]);
 
  };

  const active =async()=>{

   
    const response=await axios.post('http://localhost:5000/wbSocket');
    
  }
  const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event) => {
      console.log(event)

      // if (event.last_traded_price > Entry_price && !entryTriggered) {
      //   required_capital = ${Entry_price} * ${lotsize};
      //   entry=LTPValue
      //   console.log(LTPValue)
      //   document.getElementById('status').innerText = 'Entry Price';
      //   document.getElementById('requiredCapital').innerText = 'Required Capital: ' + required_capital;

      //   entryTriggered = true;
        
      // }

    }


  return (
    <div className='container'>

      <div className='s-nav'>
        <Navbar />
        <Nav variant="underline" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="#">{value}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" >
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <select value={value} onChange={handleChange}>

         <option value=''>Index</option> 
         <option value="NIFTY">NIFTY</option>

         


       </select>
       <button className='primary' onClick={active}>active</button>
      </div>
      <div className='row nays'>
        <div className='row'>
          <div className='col-4 nays'>a</div>
          <div className='col-4'></div>
          <div className='col-4 nays'>b</div>
        </div>
        <div className='row nays'>
          <div className='col-6'>a
            
          </div>

          <div className='col-6'>b</div>
        </div>
      </div>
    </div>
  )
}

export default Strategies