import React, { useState, useContext } from "react"
import AppContext from "../../../context/application/AppContext"
import { notesApi } from "../../../utils/api/note"

import CheckIcon from "@material-ui/icons/Check"
import BlockIcon from "@material-ui/icons/Block"
import EditIcon from "@material-ui/icons/Edit"

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

  const changeEditing = e => {
    setEditingNote(!editingNote)
  }

  return editingNote ? (
    <li>
      <form onSubmit={confirmNoteEdit}>
        <input
          type="text"
          value={newNoteText}
          onChange={e => setNewNoteText(e.target.value)}
          className="edit-note"
          autoFocus
        />
        <div className="edit-note-button-group">
          <button type="submit" className="edit-note-form-action">
            <CheckIcon />
          </button>
          <button onClick={changeEditing} aria-label="Cancel edit" className="edit-note-form-action">
            <BlockIcon />
          </button>
        </div>
      </form>
    </li>
  ) : (
    <li onClick={changeEditing}>
      {note}
      <button className="edit-note-button" aria-label="edit note">
        <EditIcon />
      </button>
    </li>
  )
}

export default Note
