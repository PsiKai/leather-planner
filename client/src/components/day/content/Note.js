import React, { useState, useContext } from 'react'

import AppContext from '../../../context/application/AppContext';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Fab from '@material-ui/core/Fab';

const Note = ({ note, list, id }) => {
    const appContext = useContext(AppContext)
    const { editNote, deleteNote } = appContext
    const [newNoteText, setNewNoteText] = useState(note)
    const [editingNote, setEditingNote] = useState(false)

    const confirmNoteEdit = (e) => {
        e.preventDefault()
        console.log(newNoteText);
        console.log(note, list, id);
        const noteObj = {note, list, id, newNoteText}
        newNoteText ?
            editNote(noteObj)
            :
            deleteNote(noteObj)
        setEditingNote(false)
    }

    const fabStyle = {
        maxHeight: "36px",
        minHeight: "36px",
        minWidth: "36px",
        maxWidth: "36px",
    }

    const changeEditing = (e) => {
        e.stopPropagation()
        setEditingNote(!editingNote)
    }

    return (
    editingNote ?
        <form onSubmit={confirmNoteEdit}>
            <input 
                type="text" 
                value={newNoteText} 
                onChange={(e) => setNewNoteText(e.target.value)}
                className="edit-note" 
                onClick={(e) => e.stopPropagation()}
                autoFocus
            />
            <Fab style={fabStyle} type="submit">
                <CheckCircleOutlineIcon />
            </Fab>
            <Fab style={fabStyle} onClick={changeEditing} aria-label="Cancel">
                <CancelOutlinedIcon />
            </Fab>
        </form>
        :
        <li onClick={changeEditing}>{note}</li>
    )
}

export default Note
