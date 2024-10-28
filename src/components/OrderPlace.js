import React, { useEffect, useState } from 'react';
import './Dashboard/dashboard.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userSchemaRedux } from '../actions/actions';
import { Oval } from 'react-loader-spinner';
function OrderPlace(props) {
  

  const dispatch = useDispatch();
  const userSchema = useSelector(state => state.account.userSchemaRedux)
  const clientdata = useSelector(state => state.account.allClientData)

  const Email = useSelector(state => state.email.email)
  const capital = props.capital
  const items = userSchema.BrokerData
  console.log(userSchema.BrokerData)
  console.log(props.load)
  // console.log(props.broker)
  console.log(capital);

  


  return (
    <div className={`${localStorage.getItem('theme')=="light-theme"?"":"vgjsdbhcd col-12"}`}>


      {clientdata.map((item, index) => (

        <div key={index} className='row OrderPlace'>

          <div className='row'>
            <div className='col-7 nays'>
              <div className='row'>
                <div className='col-3'>Broker name</div>
                <div className='col-3'>User id</div>
                <div className='col-3'>User name</div>
                <div className='col-3'>Startegies</div>
              </div>

              <div className='row mt-1'>
                <div className='col-3'>AngelOne</div>
                <div className='col-3'>{item.userData.data.clientcode}</div>
                <div className='col-3' style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {item.userData.data.name}
    </div>                <div className='col-3'>4</div>
              </div>
            </div>
            <div className='col-1'></div>
            <div className='col-4 nays'>
              <div className='row'>
                <div className='col-6'>P&L</div>
                <div className='col-6'>Capital</div>
              </div>
              <div className='row mt-1'>
                <div className='col-6'>₹</div>
                <div className='col-6'>
                  {props.load ? (
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  color="blue"
                  
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />) :
                 (capital.map((cap, index1) => {
                  if (index == index1) {
                    return (
                      <div className={cap.net < 0 ? "red" : "green"} key={index1}>
                        ₹{cap.net}
                      </div>
                    );
                  }
                }))}
                </div>
              </div>
            </div>
          </div>
          <div className='row '>
            <div className='col-12 nays'>
              Active trade's info
            </div>
          </div>
        </div>
      ))
      }
      


    </div>
  );
}

export default OrderPlace;