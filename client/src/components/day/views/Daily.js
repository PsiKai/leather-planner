import React from 'react'
import Content from '../content/Content'
import { NavLink } from 'react-router-dom'
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';

const Daily = () => {
  return (
    <div className="pattern">
        <div className='planner-toggle__wrapper'>
            <NavLink activeClassName="planner-toggle" to="/planner/month">Month <CalendarViewDayOutlinedIcon /></NavLink>
        </div>
        <img 
            src="../../images/Bald-Eagle.webp" 
            className="watermark" 
            alt="watermark"  
        />
        <Content />
    </div>
  )
}

export default Daily
