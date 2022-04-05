import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../../../styles/monthly.css"
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import axios from 'axios';
import AppContext from '../../../context/application/AppContext';

const Month = () => {
  const { list } = useContext(AppContext)
  const [monthlyLists, setMonthlyLists] = useState([])

  useEffect(() => {
    try {
      axios.get(`/list/month/${list}`)
        .then(res => setMonthlyLists(res.data.lists))
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    <div className='monthly-viewer'>
      <div className='planner-toggle__wrapper'>
        <NavLink activeClassName="planner-toggle" to="/planner/day">Day <ViewDayOutlinedIcon /></NavLink>
      </div>
      <div className='content'>
        <ul>
          {monthlyLists.length ?
            monthlyLists.map(list => (
              <li>{list.name}</li>
            ))
            :
            "Loading..."
          }
        </ul>
    </div>
  </div>
  )
}

export default Month