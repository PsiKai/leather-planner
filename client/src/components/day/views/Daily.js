import React from 'react'
import Content from '../content/Content'
import { NavLink } from 'react-router-dom'
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

const Daily = () => {
  return (
    <div className="pattern">
        <div className='planner-toggle__wrapper'>
            <NavLink activeClassName="planner-toggle" to="/planner/month">Month <ViewComfyIcon /></NavLink>
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