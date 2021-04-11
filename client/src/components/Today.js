import React, {Fragment, useContext, useEffect} from 'react';
import Weather from './Weather';
import Day from './Day';
import Datepicker from './Datepicker'
import Content from './Content'
import User from './User'
import Alert from "../components/Alert"

import AuthContext from "../context/AuthContext";


const Today = (props) => {
  const authContext = useContext(AuthContext);
  const {getUser} = authContext;


  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <div className="position-div inside-cover">
        <div className="grid-div">
          <img 
            src="./images/Bald-Eagle.png" 
            className="watermark" 
            alt="watermark"  
          />
          <div className="page">
            <div className="heading">
          
              <div className="widget">
                  <Datepicker />
                  <User />
                  <Weather/>
          
              </div>
              <Day />
            </div>
          <div className="pattern">
            <Content/>
          </div>
        </div>
      </div>
      <Alert />
      <img
        className="binder-rings"
        src="./images/binder-rings.png"
        alt="binder rings"
      />
      <img
        className="binder-rings-two"
        src="./images/binder-rings.png"
        alt="binder rings"
      />
    </div>

    
 
  </Fragment>
  )
}

export default Today;
