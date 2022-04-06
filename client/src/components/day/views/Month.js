import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "../../../styles/monthly.css"
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import axios from 'axios';
import AppContext from '../../../context/application/AppContext';

const Month = () => {
  const { dispatch, state: { list, monthlyLists } } = useContext(AppContext)

  useEffect(() => {
    axios.get(`/list/month/${list}`)
      .then(res => dispatch({ type: "SET_MONTH", payload: res.data.lists }))
      .catch(console.error)
  }, [list, dispatch])


  return (
    <div className='monthly-viewer'>
      <div className='planner-toggle__wrapper'>
        <NavLink activeClassName="planner-toggle" to="/planner/day">Day <ViewDayOutlinedIcon /></NavLink>
      </div>
      <div className='content'>
        <ul>
          {monthlyLists.length ?
            monthlyLists.map(list => (
              <li key={list._id} >{list.name}</li>
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