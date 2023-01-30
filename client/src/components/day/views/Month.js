import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"
import AppContext from "../../../context/application/AppContext"

import { CircularProgress } from "@material-ui/core"
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined"
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "../../../styles/date-picker.css"

import { getFormattedDate, shortWeekdays, getDaysInMonth, getFirstDay, months } from "../../../utils/dates"
import playAudio from "../../../utils/playAudio"
import { updateMonth, createList } from "../../../utils/api/list"

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
    const date = new Date(list.replace(/-/g, " "))
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
    setLoading(false)
  }, [monthlyLists, list])

  useLayoutEffect(() => {
    setLoading(true)
    if (!monthlyLists.length || splitListName(monthlyLists[0].name).month !== splitListName(list).month) {
      updateMonth(list, dispatch)
    }
    buildNewMonth()
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
      createList(listName, dispatch)
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

  const navigateMonths = e => {
    setLoading(true)
    let increment = +e.currentTarget.value
    let thisMonth = new Date(current.year, current.month, 1)
    let newMonth = new Date(thisMonth.setMonth(current.month + increment))
    createList(getFormattedDate(newMonth), dispatch)
  }

  const selectMonth = date => {
    setLoading(true)
    createList(getFormattedDate(date), dispatch)
  }

  return (
    <div className="monthly-viewer">
      <div className="content">
        <img src="../../images/Bald-Eagle.webp" className="watermark" alt="watermark" aria-hidden="true" />
        <nav className="month-navigation">
          <button
            className="month-navigation--button"
            value="-1"
            onClick={navigateMonths}
            aria-label="go to previous month"
          >
            <ArrowBackIosOutlinedIcon />
          </button>
          <h2 className="current-month month-label">
            {months[current?.month]}, {current?.year}
            <ArrowDropDownIcon />
            <DatePicker
              selected={new Date(list.replace(/-/g, " "))}
              onChange={selectMonth}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showPopperArrow={false}
            />
          </h2>
          <button
            className="month-navigation--button"
            value="1"
            onClick={navigateMonths}
            aria-label="go to next month"
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
        </nav>
        {daysInMonth.length ? (
          <div className="month__wrapper">
            {mapWeekdays()}
            {mapMonth()}
            <CSSTransition
              in={!!items.length && !loading}
              timeout={200}
              classNames="modal-content"
              unmountOnExit
            >
              <dialog open className="month__cell--preview">
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
              </dialog>
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
