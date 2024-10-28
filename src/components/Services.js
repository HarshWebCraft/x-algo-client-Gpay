import React from 'react'
import Navbar from './Navbar'

function Services({ darkMode, toggleDarkMode }) {

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem('theme')}`;
  }, [])

  return (

    <div className='container'>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    </div>
  )
}

export default Services