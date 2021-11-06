import React, { useState, useContext } from 'react'
import AppContext from '../../../context/application/AppContext';
import Note from "./Note"

const Notes = ({ notes, setShowNotes, list, id }) => {
    const appContext = useContext(AppContext);
    const { createNote } = appContext
    
    const [newNote, setNewNote] = useState("")

    const submitNote = () => {
        const notePayload = { newNote, list, id }
        createNote(notePayload)
    }

    return (
    <>
        <div className="notes-border">
        <div className="notes-container">
            <form onSubmit={submitNote}>
                <input type="text" onChange={(e) => setNewNote(e.target.value)} value={newNote}/>
                <button type="submit">Submit Note</button>
            </form>
            <ul className="notes-list">
                {notes.map((note, i) => {
                    return <Note key={i} note={note}/> 
                })}
            </ul>
        </div>
        </div>
        <div className="menu-backdrop" onClick={() => setShowNotes(false)}></div>
    </>
    )
}

export default Notes
