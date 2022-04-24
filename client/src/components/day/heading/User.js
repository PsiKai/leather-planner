import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../../context/authentication/AuthContext"
import AppContext from "../../../context/application/AppContext"
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Button from "@material-ui/core/Button"
import FormLabel from "@material-ui/core/FormLabel"

const User = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext)
  const { resetDate } = useContext(AppContext)

  const logoff = () => {
    dispatch({ type: "LOG_OUT" })
    resetDate()
  }

  return (
    <React.Fragment>
      <FormLabel className="user-nav">
        <Link to="/profile">
          <span>{user?.name}</span>
          <PersonOutlineRoundedIcon />
        </Link>
      </FormLabel>
      <Button size="small" onClick={logoff}>
        Logout
        <ExitToAppIcon></ExitToAppIcon>
      </Button>
    </React.Fragment>
  )
}

export default User
