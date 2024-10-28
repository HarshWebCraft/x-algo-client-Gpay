import React from 'react'
import Navbar from './Navbar'
import Listofbroker from './Listofbroker'
function Broker({ darkMode, toggleDarkMode }) {
  return (
    <div>
        <div className=''>
         <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
         <Listofbroker/>
         </div>
    </div>
  )
}

export default Broker