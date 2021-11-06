import React, { useState, useContext } from 'react'
import AppContext from '../../../context/application/AppContext';
import Note from "./Note"
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const Notes = ({ notes, revealNotes, list, id }) => {
    const appContext = useContext(AppContext);
    const { createNote } = appContext
    
    const [newNote, setNewNote] = useState("")

    const submitNote = (e) => {
        e.preventDefault()
        const notePayload = { newNote, list, id }
        createNote(notePayload)
        setNewNote("")
    }

    return (
    <>
        <div className="notes-border">
        <div className="notes-container">
            <form onSubmit={submitNote}>
                <input 
                    type="text" 
                    onChange={(e) => setNewNote(e.target.value)} 
                    value={newNote}
                    placeholder="Add a note ..."
                    />
                <Fab type="submit"><AddIcon /></Fab>
            </form>
            <ul className="notes-list">
                {notes.length ? 
                    notes.map((note, i) => {
                        return <Note key={i} note={note} /> 
                    })
                    :
                    <li></li>}
            </ul>
        </div>
        </div>
        <div className="menu-backdrop" onClick={(e) => revealNotes(e)}></div>
    </>
    )
}

export default Notes
