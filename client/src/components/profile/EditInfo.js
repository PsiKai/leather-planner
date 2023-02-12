import React, { useEffect, useContext, useState } from "react"

import AuthContext from "../../context/authentication/AuthContext"
import { updateUser } from "../../utils/api/user"

import CheckIcon from "@material-ui/icons/Check"
import BlockIcon from "@material-ui/icons/Block"
import EditIcon from "@material-ui/icons/Edit"

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

  return (
    <div className="profile--wrapper">
      <label className="profile--label" htmlFor="username">
        Username:
      </label>
      {editName ? (
        <form onSubmit={submitInfo} className="edit-info--form">
          <input
            id="username"
            className="new-item browser-default"
            name="name"
            type="text"
            onChange={editInfo}
            value={info.name}
            autoFocus
          />
          <div className="edit-info-button-group">
            <button className="edit-info-form-action" type="submit" aria-label="Submit username changes">
              <CheckIcon />
            </button>
            <button
              className="edit-info-form-action"
              type="button"
              onClick={() => setEditName(false)}
              aria-label="Cancel username changes"
            >
              <BlockIcon />
            </button>
          </div>
        </form>
      ) : (
        <div className="profile--info">
          <p id="username">{name}</p>
          <button
            className="edit-info-form-action"
            aria-label="Edit username"
            onClick={() => setEditName(true)}
          >
            <EditIcon />
          </button>
        </div>
      )}
      <label className="profile--label" htmlFor="email">
        Email:
      </label>
      {editEmail ? (
        <form onSubmit={submitInfo} className="edit-info--form">
          <input
            id="email"
            className="new-item browser-default"
            name="email"
            type="text"
            onChange={editInfo}
            value={info.email}
            autoFocus
          />
          <div className="edit-info-button-group">
            <button className="edit-info-form-action" type="submit" aria-label="Submit email changes">
              <CheckIcon />
            </button>
            <button
              className="edit-info-form-action"
              type="button"
              onClick={() => setEditEmail(false)}
              aria-label="Cancel email changes"
            >
              <BlockIcon />
            </button>
          </div>
        </form>
      ) : (
        <div className="profile--info">
          <p id="email">{email}</p>
          <button
            className="edit-info-form-action"
            aria-label="Edit email"
            onClick={() => setEditEmail(true)}
          >
            <EditIcon />
          </button>
        </div>
      )}
    </div>
  )
}

export default EditInfo
