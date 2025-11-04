import React, { useState, useRef, useEffect, useContext } from "react"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"
import SearchIcon from "@mui/icons-material/Search"

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

    return () => clearTimeout(debounceTimer.current)
  }, [searchTerm, dispatch, searchForUser])

  return (
    <div className="searchbar--container">
      <input
        className="searchbar"
        type="text"
        placeholder="Search for user"
        value={searchTerm}
        onChange={updateSearch}
        autoCorrect="false"
      />
      <SearchIcon />
    </div>
  )
}

export default UserSearchbar
