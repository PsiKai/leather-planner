import React, { useState, useContext, useEffect } from "react"
import AppContext from "../../../context/application/AppContext"
import { notesApi } from "../../../utils/api/note"
import Note from "./Note"
import Menu from "./Menu"
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"
import CloseOutlined from "@material-ui/icons/CloseOutlined"

const Notes = ({ notes, openMenu, list, id, ...rest }) => {
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
      <div className="notes-border" onClick={e => e.stopPropagation()}>
        <div className="notes-container">
          <Menu {...rest} />
          <form onSubmit={submitNote}>
            <input
              type="text"
              onChange={e => setNewNote(e.target.value)}
              value={newNote}
              placeholder="Write a note ..."
            />
            <Fab type="submit" className="add-note--button" aria-label="add note">
              <AddIcon />
            </Fab>
          </form>
          <ul className="notes-list">
            {notes.length ? (
              notes.map((note, i) => {
                return <Note key={id} note={note} id={id} list={list} />
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
