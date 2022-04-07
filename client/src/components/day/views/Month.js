import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import AppContext from '../../../context/application/AppContext';

import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import { CircularProgress } from '@material-ui/core';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';

import { getFormattedDate, shortWeekdays, getDaysInMonth } from '../../../utils/dates';

import "../../../styles/monthly.css"

const Month = (props) => {
  const { dispatch, state: { list, monthlyLists } } = useContext(AppContext)
  const [daysInMonth, setDaysInMonth] = useState([])
  const [currentMonth, setCurrentMonth] = useState()

  useEffect(() => {
    axios.get(`/list/month/${list}`)
      .then(res => dispatch({ type: "SET_MONTH", payload: res.data.lists }))
      .catch(console.error)
  }, [list, dispatch])

  useEffect(() => {
    const date = new Date(list)
    // const days = new Date(date.getYear(), date.getMonth() + 1, 0).getDate()
    const days = getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    setCurrentMonth({month: date.getMonth(), year: date.getFullYear()})
    let month = []
    for (let i = 0; i < days; i++) {
      const foundList = monthlyLists.find(list => {
        const { day } = splitListName(list.name)
        return +day === i + 1
      })
      month.push(foundList || i + 1)
    }
    setDaysInMonth(month)
  }, [monthlyLists, list])

  const goToSelectedDate = async (e) => {
    const selectedSquare = e.currentTarget.getAttribute("data-date")
    const day = splitListName(selectedSquare).day || selectedSquare
    const dateConstruct = currentMonth.year + ", " + (currentMonth.month + 1) + ", " +  day.padStart(2, "0")
    const listName = getFormattedDate(new Date(dateConstruct))
    try {
      const res = await axios.get(`/list/new/${listName}`)
      dispatch({ type: "GET_LIST", payload: res.data })
      props.history.push("/planner/day")
    } catch (error) {
      console.log(error)
    }
  }

  function splitListName(name) {
    const [m, d, y] = name.split(/(?:-0|-)/)
    return { month: m, day: d, year: y }
  }

  return (
    <div className='monthly-viewer'>
      <div className='content'>
        <div className='month__wrapper'>
          {shortWeekdays.map(day => <span className='weekday-label' key={day}>{day}</span>)}
          {daysInMonth.length ?
            daysInMonth.map((day, i) => (
              <div 
                className='month__cell'
                data-date={day.name || String(day)}
                key={day._id || day}
                style={i === 0 ? {"--start": `${(new Date(currentMonth.year, currentMonth.month, 1).getDay() + 1)}`} : {}}
                onClick={goToSelectedDate}  
              >
                <span className='month__date'>{i + 1}</span>
                  {day.items?.map(item => {
                    if (item.style === "strikethrough") {
                      return <TurnedInIcon key={item.item} />
                    } else {
                      return <TurnedInNotIcon key={item.item}/>
                    }
                  })}
              </div>
            ))
            :
            <CircularProgress />
          }
        </div>
        <div className='planner-toggle__wrapper'>
          <NavLink activeClassName="planner-toggle" to="/planner/day">
            <ViewDayOutlinedIcon />
          </NavLink>
        </div>
    </div>
  </div>
  )
}

export default Month
