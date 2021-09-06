import React, {Fragment, useContext, useEffect} from 'react';
import Weather from './heading/Weather';
import Day from './heading/Day';
import Datepicker from './heading/Datepicker'
import Content from './content/Content'
import User from './heading/User'
import Alert from "../Alert"

import AuthContext from "../../context/authentication/AuthContext";


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
          <div className="page">
            <div className="heading today">
              <div className="widget">
                  <Datepicker />
                  <User />
                  <Weather/>
          
              </div>
              <Day />
            </div>
            <div className="pattern__wrapper" style={{overflowY: "auto", overflowX: "visible"}}>
              <div className="pattern">
                <img 
                  src="./images/Bald-Eagle.png" 
                  className="watermark" 
                  alt="watermark"  
                />
                <Content/>
              </div>
            </div>
          </div>
        </div>
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
      <Alert />
    </div>

    
 
  </Fragment>
  )
}

export default Today;
