import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../../context/authentication/AuthContext"
import AppContext from "../../../context/application/AppContext"
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { createList } from "../../../utils/api/list"
import { getFormattedDate } from "../../../utils/dates"

const User = () => {
  const {
    state: { user },
    dispatch: authDispatch,
  } = useContext(AuthContext)
  const { dispatch } = useContext(AppContext)

  const logoff = () => {
    authDispatch({ type: "LOG_OUT" })
    createList(getFormattedDate(), dispatch)
  }

  return (
    <React.Fragment>
      <label className="user-nav">
        <Link to="/profile" aria-label="Got to your profile settings">
          <span>{user?.name}</span>
          <PersonOutlineRoundedIcon />
        </Link>
      </label>
      <button size="small" onClick={logoff} className="logout-button">
        Logout
        <ExitToAppIcon></ExitToAppIcon>
      </button>
    </React.Fragment>
  )
}

export default User
