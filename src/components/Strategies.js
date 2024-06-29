import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './Dashboard/dashboard.css'
import data from '../data.json'
import { Dropdown, DropdownButton, Nav } from 'react-bootstrap'
import axios from 'axios';
import persistCombineReducers from 'redux-persist/lib/persistCombineReducers'
import StrategiesNavbar from './StrategiesNavbar'
function Strategies() {

  const [ceEntry, setCeEntry] = useState(0);
  const [peEntry, setPeEntry] = useState(0);
  const [strike_ce, setStrike_ce] = useState('');
  const [required_capital, setrequired_capital] = useState(0)
  const [entry, setentry] = useState(0);
  const [pestoploss, setpestoploss] = useState(0);
  const [cestoploss, setcestoploss] = useState(0);
  const [exit, setExit] = useState(0);
  const [sl, setSl] = useState(false);
  const [tp, setTp] = useState(false);
  const [PandL, setPandL] = useState(0);
  const [currentCapital, setCurrentcapital] = useState(0);
  const [status, setStatus] = useState('')
  const [entryTriggered, setentryTriggered] = useState(false);
  const [ceLTP, setceLTP] = useState(0)
  const [peLTP, setpeLTP] = useState(0)
  const [peToken, setPeToken] = useState('');
  const [ceToken, setCeToken] = useState(0);
  const [Exit_price_ce, setExit_price_ce] = useState(0);
  const [Exit_price_pe, setExit_price_pe] = useState(0);

  const lotsize = 15;
  let capital = 100000;




  useEffect(() => {


    // const intervalId = setInterval(() => {
    //   const change = Math.random() < 0.5 ? -1 : 1; // Randomly select -1 or 1
    //   const increment = Math.floor(Math.random() * 5); // Random number between 0 and 2
    //   setLTP(prevLTP => {
    //     const newValue = prevLTP + (change * increment);
    //     // Ensure newValue stays within the range of 22698 to 22702
    //     return Math.min(Math.max(newValue, 22680), 22710);
    //   });
    // }, 1000);

    // const now = new Date();
    // const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()+5); // 09:59:59
    // console.log(targetTime)
    // let timeUntilTarget = targetTime - now;

    // if (timeUntilTarget < 0) {
    //   targetTime.setDate(targetTime.getDate() + 1);
    //   timeUntilTarget = targetTime - now;
    // }

    // const timerId = setTimeout(async () => {

    //   const response2 = await axios.post('https://x-algo-gpay.onrender.com/getSymbol');

    //   const ceSymbol = response2.data.ceToken
    //   const peToken = response2.data.peToken
    //   console.log(ceSymbol)
    //   const peSymbol = response2.data.peSymbol
    //   console.log(response2.data.cehigh)
    //   console.log(response2.data.pehigh)
    //   setCeEntry(response2.data.cehigh);
    //   setPeEntry(response2.data.pehigh);

    //   // const response = await axios.post('https://x-algo-gpay.onrender.com/wbSocket', { ceSymbol, peSymbol });
    //   // console.log(response)
    //   const ws = new WebSocket('ws://localhost:3001');

    //   ws.onmessage = (event) => {


    //     const data = JSON.parse(event.data);
    //     console.log(data.last_traded_price)
    //     // if (event.data.token === '41706') {
    //     //   setceLTP(event.data.last_traded_price)
    //     // }
    //     // if (event.data.token === '41707') {
    //     //   setpeLTP(event.data.last_traded_price)
    //     // }
    //     setceLTP(data.last_traded_price)
    //     console.log("qwertyuio")
    //     console.log(ceLTP)



    //     if (data.last_traded_price > 5000 && !entryTriggered) {

    //       console.log(data.last_traded_price)
    //       setStatus('Entry')
    //       setrequired_capital(data.last_traded_price * lotsize)

    //       console.log(entry)
    //       setcestoploss(data.last_traded_price - 30)
    //       setExit_price_ce(data.last_traded_price + 30)
    //       setentryTriggered(true);

    //     }
    //     if (peLTP > peEntry && !entryTriggered) {

    //       console.log(peLTP)
    //       setStatus('Entry')
    //       setrequired_capital(peLTP * lotsize)

    //       console.log(entry)
    //       setpestoploss(peLTP - 30)
    //       setExit_price_pe(peLTP + 30)
    //       setentryTriggered(true);

    //     }

    //     // if (entryTriggered && !sl && !tp) {

    //     //   const value = 10000 + ((LTP - ceEntry) * lotsize);
    //     //   setCurrentcapital(value)
    //     //   setPandL((LTP - ceEntry) * lotsize)

    //     // }

    //     if (data.last_traded_price >= Exit_price_ce && entryTriggered) {

    //       console.log(data.last_traded_price)
    //       setStatus('Target Reached')
    //       setTp(true)
    //     }

    //     if (data.last_traded_price <= cestoploss && entryTriggered && !tp) {

    //       setStatus('Stop loss hit')
    //       setSl(true)

    //     }

    //     if (peLTP >= Exit_price_pe && entryTriggered) {

    //       console.log(peLTP)
    //       setStatus('Target Reached')
    //       setTp(true)
    //     }

    //     if (peLTP <= pestoploss && entryTriggered && !tp) {

    //       setStatus('Stop loss hit')
    //       setSl(true)

    //     }

    //   }

    // const matchedSymbol = data.find(item => item.symbol === response2.data.CE_symbol);

    // const matchedSymbol2 = data.find(item => item.symbol === response2.data.PE_symbol);






    // setStrike_ce(response2.data.strike_ce);

    // data.map()
    //   console.log("Code executed at " + targetTime);

    // }, timeUntilTarget);




  }, [])

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem('theme')}`;
  }, [])

  const [value, setValue] = useState('NIFTY');

  const handleChange = (event) => {

    setValue(prevSelectedValues => [...prevSelectedValues, event.target.value]);

  };


  return (
    <div className='container'>

      <div className='s-nav'>
        <Navbar />
        <StrategiesNavbar />

      </div>
    </div>
  )
}

export default Strategies