import React, { useState, useContext } from 'react'
import AppContext from '../../../context/application/AppContext';
import Note from "./Note"
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const Notes = ({ notes, setShowNotes, list, id }) => {
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
                {/* <button className="btb" type="submit">Submit Note</button> */}
                <Fab type="submit"><AddIcon /></Fab>
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
