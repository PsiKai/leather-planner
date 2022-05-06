import React, { useState, useRef, useEffect, useContext } from "react"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"
// import { searchForUser } from "../../utils/api/analytics"

const UserSearchbar = ({ searchForUser }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { dispatch } = useContext(AnalyticsContext)
  const debounceTimer = useRef()

  const updateSearch = ({ target: { value } }) => {
    setSearchTerm(value)
    // value ? searchForUser(value) : console.log("no search term")
  }

  useEffect(() => {
    clearTimeout(debounceTimer?.current)
    dispatch({ type: "SET_LOADING" })
    debounceTimer.current = setTimeout(() => searchForUser(searchTerm), 1000)
  }, [searchTerm, dispatch, searchForUser])

  useEffect(() => clearTimeout(debounceTimer?.current), [])

  return (
    <div>
      <input type="text" placeholder="Search for user" value={searchTerm} onChange={updateSearch} />
    </div>
  )
}

export default UserSearchbar
