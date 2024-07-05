import React from 'react'
import Navbar from './Navbar'
import './myWallet.css'
import './button.scss'

const MyWallet = () => {

  React.useEffect(() => {
    document.body.className = `${localStorage.getItem('theme')}`;
}, [])

  return (
    <>
        <div className='container'>
            <Navbar/>
            <div className={`${localStorage.getItem('theme') === "light-theme" ? 'thaksn' : 'rgvba'}`}>
                <h2 className='oquen'>My balance</h2>
                <h2 className='fund'>$0.0000</h2>
                <div className='with-dipo-button'>
                    <a href="#" class="qscavn">Deposit</a>
                    <a href="#" class="qscavn2">Withdraw</a>
                </div>
            </div>
         </div>
    </>
  )
}

export default MyWallet