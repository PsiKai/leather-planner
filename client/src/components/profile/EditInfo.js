import React, { useEffect, useContext, useState } from "react"

import AuthContext from "../../context/authentication/AuthContext"
import { updateUser } from "../../utils/api/user"

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined"
import EditIcon from "@material-ui/icons/Edit"
import Fab from "@material-ui/core/Fab"

const EditInfo = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext)
  const { name, email } = user ?? {}

  const [editName, setEditName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [info, setInfo] = useState({ name, email } ?? {})

  useEffect(() => {
    if (user) setInfo({ name: user.name, email: user.email })
  }, [user])

  const editInfo = e => {
    const { name, value } = e.target
    setInfo(prevInfo => ({ ...prevInfo, [name]: value }))
  }

  const submitInfo = e => {
    e.preventDefault()
    const { name, value } = e.target[0]
    const payload = { user, name, value }
    updateUser(payload, dispatch)
    name === "name" ? setEditName(false) : setEditEmail(false)
  }

  const fabStyle = {
    maxHeight: "36px",
    minHeight: "36px",
    minWidth: "36px",
    maxWidth: "36px",
  }

  return (
    <div className="profile--wrapper">
      <label className="profile--label" htmlFor="username">
        Username:
      </label>
      {editName ? (
        <form onSubmit={submitInfo}>
          <input className="new-item browser-default" name="name" type="text" onChange={editInfo} value={info.name} autoFocus />
          <div style={{ position: "absolute" }}>
            <Fab style={fabStyle} type="submit">
              <CheckCircleOutlineIcon />
            </Fab>
            <Fab style={fabStyle} onClick={() => setEditName(false)} aria-label="Cancel">
              <CancelOutlinedIcon />
            </Fab>
          </div>
        </form>
      ) : (
        <p id="username" className="profile--info" onClick={() => setEditName(true)}>
          {name} <EditIcon aria-label="Edit username" />
        </p>
      )}
      <label className="profile--label" htmlFor="email">
        Email:
      </label>
      {editEmail ? (
        <form onSubmit={submitInfo}>
          <input className="new-item browser-default" name="email" type="text" onChange={editInfo} value={info.email} autoFocus />
          <div style={{ position: "absolute" }}>
            <Fab style={fabStyle} type="submit">
              <CheckCircleOutlineIcon />
            </Fab>
            <Fab style={fabStyle} onClick={() => setEditEmail(false)} aria-label="Cancel">
              <CancelOutlinedIcon />
            </Fab>
          </div>
        </form>
      ) : (
        <p id="email" className="profile--info" onClick={() => setEditEmail(true)}>
          {email} <EditIcon aria-label="Edit email" />
        </p>
      )}
    </div>
  )
}

export default EditInfo
