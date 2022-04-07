import React from 'react'
import Content from '../content/Content'
import { NavLink } from 'react-router-dom'
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';

const Daily = () => {
  return (
    <div className="pattern">
        <img 
            src="../../images/Bald-Eagle.webp" 
            className="watermark" 
            alt="watermark"  
        />
        <Content />
        <div className='planner-toggle__wrapper'>
            <NavLink activeClassName="planner-toggle" to="/planner/month">
                <CalendarViewDayOutlinedIcon />
            </NavLink>
        </div>
    </div>
  )
}

export default Daily
