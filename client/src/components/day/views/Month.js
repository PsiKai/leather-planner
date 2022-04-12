import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CSSTransition } from "react-transition-group"
import AppContext from "../../../context/application/AppContext"

import { CircularProgress } from "@material-ui/core"
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot"
import TurnedInIcon from "@material-ui/icons/TurnedIn"
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined"
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined"

import { getFormattedDate, shortWeekdays, getDaysInMonth, getFirstDay } from "../../../utils/dates"
import playAudio from "../../../utils/playAudio"

import "../../../styles/monthly.css"

const Month = () => {
  const {
    dispatch,
    state: { list, monthlyLists, items },
  } = useContext(AppContext)
  const [daysInMonth, setDaysInMonth] = useState([])
  const [current, setCurrent] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => playAudio("page"), [])

  useEffect(() => {
    setLoading(true)
    if (splitListName(monthlyLists[0].name).month !== splitListName(list).month) {
      axios
        .get(`/list/month/${list}`)
        .then(res => dispatch({ type: "SET_MONTH", payload: res.data.lists }))
        .catch(console.error)
    }
    setLoading(false)
  }, [list, dispatch, monthlyLists])

  useEffect(() => {
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

  const goToSelectedDate = async e => {
    setLoading(true)
    const selectedSquare = e.currentTarget.getAttribute("data-date")
    const day = splitListName(selectedSquare).day || selectedSquare
    const dateConstruct = `${current.year} ${current.month + 1} ${day.padStart(2, "0")}`
    const listName = getFormattedDate(new Date(dateConstruct))
    try {
      const res = await axios.get(`/list/new/${listName}`)
      dispatch({ type: "GET_LIST", payload: res.data })
    } catch (error) {
      console.log(error)
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
        {/* <CheckBoxOutlineBlankOutlinedIcon /> */}
        {/* <span>{completeItems.length}</span> */}
        {/* <CheckBoxOutlinedIcon /> */}
      </div>
    ) : null
  }

  function splitListName(name) {
    const [m, d, y] = name.split(/(?:-0|-)/)
    return { month: m, day: d, year: y }
  }

  return (
    <div className="monthly-viewer">
      <div className="content">
        <div className="month__wrapper">
          {shortWeekdays.map(day => (
            <span className="weekday-label" key={day}>
              {day}
            </span>
          ))}
          {daysInMonth.length ? (
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
                {/* {day.items?.map(item => {
                  let Icon = item.style === "strikethrough" ? TurnedInIcon : TurnedInNotIcon
                  return <Icon key={item.item} />
                })} */}
                {/* <span className="month_cell--items">{day.items?.length || null}</span> */}
              </div>
            ))
          ) : (
            <CircularProgress />
          )}
          <CSSTransition in={items.length && !loading} timeout={200} classNames="modal-content" unmountOnExit>
            <div className="month__cell--preview">
              <ul className="items__preview--list">
                {items.length ? <h3>{list}</h3> : null}
                {items?.map(item => (
                  <li className={item.style} key={item._id}>
                    {item.item}
                  </li>
                ))}
              </ul>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  )
}

export default Month
