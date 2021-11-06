import React, { useState } from 'react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Fab from '@material-ui/core/Fab';

const Note = ({ note }) => {
    const [newNoteText, setNewNoteText] = useState(note)
    const [editingNote, setEditingNote] = useState(false)

    const confirmNoteEdit = (e) => {
        e.preventDefault()
        console.log(newNoteText);
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
