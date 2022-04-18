import React, { useState, useContext } from "react"
import AppContext from "../../../context/application/AppContext"
import Note from "./Note"
import Menu from "./Menu"
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"

const Notes = ({ notes, openMenu, list, id, ...rest }) => {
  const appContext = useContext(AppContext)
  const { createNote } = appContext

  const [newNote, setNewNote] = useState("")

  const submitNote = e => {
    e.preventDefault()
    if (!newNote) {
      return
    }
    const notePayload = { newNote, list, id }
    createNote(notePayload)
    setNewNote("")
  }

  return (
    <>
      <div className="notes-border" onClick={e => e.stopPropagation()}>
        <div className="notes-container">
          <Menu {...rest} />
          <form onSubmit={submitNote}>
            <input type="text" onChange={e => setNewNote(e.target.value)} value={newNote} placeholder="Add a note ..." />
            <Fab type="submit" className="add-note--button">
              <AddIcon />
            </Fab>
          </form>
          <ul className="notes-list">
            {notes.length ? (
              notes.map((note, i) => {
                return <Note key={i} note={note} id={id} list={list} />
              })
            ) : (
              <li></li>
            )}
          </ul>
        </div>
      </div>
      <div className="menu-backdrop" onClick={e => openMenu(e)}></div>
    </>
  )
}

export default Notes
