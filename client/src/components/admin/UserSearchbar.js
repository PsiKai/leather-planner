import React, { useState, useRef, useEffect, useContext } from "react"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"
import SearchIcon from "@material-ui/icons/Search"

const UserSearchbar = ({ searchForUser }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { dispatch } = useContext(AnalyticsContext)
  const debounceTimer = useRef()

  const updateSearch = ({ target: { value } }) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    clearTimeout(debounceTimer.current)
    dispatch({ type: "SET_LOADING" })
    debounceTimer.current = setTimeout(() => searchForUser(searchTerm), 1000)
  }, [searchTerm, dispatch, searchForUser])

  useEffect(() => clearTimeout(debounceTimer.current), [])

  return (
    <div className="searchbar--container">
      <input className="searchbar" type="text" placeholder="Search for user" value={searchTerm} onChange={updateSearch} />
      <SearchIcon />
    </div>
  )
}

export default UserSearchbar
