import React, {Fragment} from 'react';
import Weather from './Weather';
import Day from './Day';
import Datepicker from './Datepicker'
import Content from './Content'


const Today = () => {
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
                  
                  <Weather/>
              </div>
              <Day />
            </div>
          <div className="pattern">
            <Content/>
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
    </div>
  </Fragment>
  )
}

export default Today;
