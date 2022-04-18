import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
import axios from "axios"
import { CSSTransition } from "react-transition-group"
import AppContext from "../../../context/application/AppContext"

import { CircularProgress } from "@material-ui/core"

import { getFormattedDate, shortWeekdays, getDaysInMonth, getFirstDay } from "../../../utils/dates"
import playAudio from "../../../utils/playAudio"

import "../../../styles/monthly.css"
import { NavLink } from "react-router-dom"

const Month = () => {
  const {
    dispatch,
    state: { list, monthlyLists, items },
  } = useContext(AppContext)
  const [daysInMonth, setDaysInMonth] = useState([])
  const [current, setCurrent] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => playAudio("page"), [])

  const buildNewMonth = useCallback(() => {
    console.log("building month")
    const date = new Date(list)
    const days = getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    setCurrent({ month: date.getMonth(), year: date.getFullYear(), day: date.getDate() })
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

  useLayoutEffect(() => {
    setLoading(true)
    if (!monthlyLists.length || splitListName(monthlyLists[0].name).month !== splitListName(list).month) {
      axios
        .get(`/list/month/${list}`)
        .then(res => dispatch({ type: "SET_MONTH", payload: res.data.lists }))
        .catch(console.error)
    }
    buildNewMonth()
    setLoading(false)
  }, [list, dispatch, monthlyLists, buildNewMonth])

  function splitListName(name) {
    const [m, d, y] = name.split(/(?:-0|-)/)
    return { month: m, day: d, year: y }
  }

  const goToSelectedDate = async e => {
    setLoading(true)
    const selectedSquare = e.currentTarget.getAttribute("data-date")
    const day = splitListName(selectedSquare).day || selectedSquare
    const dateConstruct = `${current.year} ${current.month + 1} ${day.padStart(2, "0")}`
    const listName = getFormattedDate(new Date(dateConstruct))
    const newList = monthlyLists.find(list => list.name === listName)
    if (newList) {
      const { name, items } = newList
      dispatch({ type: "GET_LIST", payload: { list: name, items } })
    } else {
      try {
        const res = await axios.get(`/list/new/${listName}`)
        dispatch({ type: "GET_LIST", payload: res.data })
      } catch (error) {
        console.log(error)
      }
    }
    setLoading(false)
  }

  const renderItems = items => {
    let completeItems = items?.filter(item => item.style === "strikethrough")
    return items?.length ? (
      <div className="month__cell--items">
        <span>
          {completeItems.length}/{items.length}
        </span>
      </div>
    ) : null
  }

  const mapWeekdays = () =>
    shortWeekdays.map(day => (
      <span className="weekday-label" key={day}>
        {day}
      </span>
    ))

  const mapMonth = () =>
    daysInMonth.map((day, i) => (
      <div
        className="month__cell"
        data-date={day.name || String(day)}
        key={day._id || day}
        style={i === 0 ? { "--start": `${getFirstDay(current.year, current.month)}` } : {}}
        onClick={goToSelectedDate}
      >
        <span className={`month__date ${i + 1 === current.day && !loading ? "today" : ""}`}>{i + 1}</span>
        {renderItems(day.items)}
      </div>
    ))

  return (
    <div className="monthly-viewer">
      <div className="content">
        {daysInMonth.length ? (
          <div className="month__wrapper">
            {mapWeekdays()}
            {mapMonth()}
            <CSSTransition in={!!items.length && !loading} timeout={200} classNames="modal-content" unmountOnExit>
              <div className="month__cell--preview">
                <ul className="items__preview--list">
                  <NavLink to="/planner/day">
                    <h3>{list}</h3>
                  </NavLink>
                  {items.map(item => (
                    <li className={item.style} key={item._id}>
                      {item.item}
                    </li>
                  ))}
                </ul>
              </div>
            </CSSTransition>
          </div>
        ) : (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  )
}

export default Month
