import React, { useState, useEffect } from "react"
import { searchForUser } from "../../utils/api/analytics"

const UserSearchbar = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const updateSearch = ({ target: { value } }) => {
    setSearchTerm(value)
    value ? searchForUser(value) : console.log("no search term")
  }

  return (
    <div>
      <input type="text" placeholder="Search for user" value={searchTerm} onChange={updateSearch} />
    </div>
  )
}

export default UserSearchbar
