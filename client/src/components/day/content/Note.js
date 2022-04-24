import React, { useState, useContext } from "react"
import AppContext from "../../../context/application/AppContext"
import { notesApi } from "../../../utils/api/note"

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined"
import EditIcon from "@material-ui/icons/Edit"
import Fab from "@material-ui/core/Fab"

const Note = ({ note, list, id }) => {
  const { dispatch } = useContext(AppContext)
  const [newNoteText, setNewNoteText] = useState(note)
  const [editingNote, setEditingNote] = useState(false)

  const confirmNoteEdit = e => {
    e.preventDefault()
    const noteObj = { note, list, id, newNoteText }
    newNoteText ? notesApi.update(noteObj, dispatch) : notesApi.delete(noteObj, dispatch)
    setEditingNote(false)
  }

  const fabStyle = {
    maxHeight: "36px",
    minHeight: "36px",
    minWidth: "36px",
    maxWidth: "36px",
  }

  const changeEditing = e => {
    setEditingNote(!editingNote)
  }

  return editingNote ? (
    <form onSubmit={confirmNoteEdit}>
      <input type="text" value={newNoteText} onChange={e => setNewNoteText(e.target.value)} className="edit-note" autoFocus />
      <Fab style={fabStyle} type="submit">
        <CheckCircleOutlineIcon />
      </Fab>
      <Fab style={fabStyle} onClick={changeEditing} aria-label="Cancel">
        <CancelOutlinedIcon />
      </Fab>
    </form>
  ) : (
    <li onClick={changeEditing}>
      {note}
      <EditIcon />
    </li>
  )
}

export default Note
