import React, { useState, useContext, useEffect } from "react"
import AppContext from "../../../context/application/AppContext"
import { notesApi } from "../../../utils/api/note"
import Note from "./Note"
import Menu from "./Menu"
import AddIcon from "@mui/icons-material/Add"
import Fab from "@mui/material/Fab"
import CloseOutlined from "@mui/icons-material/CloseOutlined"

const Notes = ({ notes, openMenu, list, id, nodeRef, ...rest }) => {
  const { dispatch } = useContext(AppContext)

  const [newNote, setNewNote] = useState("")

  useEffect(() => {
    const handleKeyboardDismiss = e => {
      if (e.key === "Escape") openMenu(e)
    }
    window.addEventListener("keydown", handleKeyboardDismiss)
    return () => window.removeEventListener("keydown", handleKeyboardDismiss)
  }, [openMenu])

  const submitNote = e => {
    e.preventDefault()
    if (!newNote) {
      return
    }
    const notePayload = { newNote, list, id }
    notesApi.create(notePayload, dispatch)
    setNewNote("")
  }

  return (
    <>
      <div ref={nodeRef} className="notes-border" onClick={e => e.stopPropagation()}>
        <div className="notes-container">
          <Menu {...rest} />
          <form onSubmit={submitNote}>
            <input
              type="text"
              onChange={e => setNewNote(e.target.value)}
              value={newNote}
              placeholder="Write a note ..."
              className="new-note"
            />
            <Fab type="submit" className="add-note--button" aria-label="add note">
              <AddIcon />
            </Fab>
          </form>
          <ul className="notes-list">
            {notes.length ? (
              notes.map(note => {
                return <Note key={Math.random()} note={note} id={id} list={list} />
              })
            ) : (
              <li></li>
            )}
          </ul>
        </div>
        <button className="modal-close-button" onClick={e => openMenu(e)} aria-label="close menu">
          <CloseOutlined />
        </button>
      </div>
      <div className="menu-backdrop" onClick={e => openMenu(e)}></div>
    </>
  )
}

export default Notes
