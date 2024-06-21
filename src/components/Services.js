import React from 'react'
import Navbar from './Navbar'

function Services() {

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem('theme')}`;
  }, [])

  return (

    <div className='container'>
        <Navbar/>
    </div>
  )
}

export default Services