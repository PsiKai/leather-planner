import React, { useContext, useState, useRef, Fragment } from 'react'
import AppContext from '../../../context/application/AppContext';
import AuthContext from '../../../context/authentication/AuthContext';
import Input from "./Input"
import Notes from "./Notes"

import axios from "axios"

import playAudio from "../../../utils/playAudio"

// import EditIcon from '@material-ui/icons/Edit';
// import ForwardIcon from '@material-ui/icons/Forward';
// import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
// import UndoIcon from '@material-ui/icons/Undo';
// import DeleteIcon from '@material-ui/icons/Delete';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import NotesIcon from '@material-ui/icons/Notes';

import { CSSTransition } from 'react-transition-group'

const List = ({ list, id, moved, style, content, notes }) => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const { crossOff, removeItem } = appContext
    const { setAlert } = authContext

    const [menu, setMenu] = useState(false)
    const [edit, setEdit] = useState(false)
    const [itemStyle, setItemStyle] = useState(style)
    // const [showNotes, setShowNotes] = useState(false)

    const listItemText = useRef()
    const selectedListItem = useRef()

    const cross = () => {
        const strike = listItemText.current.classList
        strike.toggle("strikethrough")
        strike.value && playAudio("cross")
        const item = { list, id, style }
        setItemStyle(strike.value)
        crossOff(item);
    }

    const undoEdit = () => {
        setEdit(false)
    }

    const carryOver = async () => {
        const { classList: [value] } = listItemText.current
        var item = { list, style: value, content, notes }
        try {
            const res = await axios.post("/item/move", item)
            const { data: { msg }, status } = res
            setAlert({ msg, status });
        } catch (error) {
            const { data: { msg }, status } = error.response
            setAlert({ msg, status })
        }
    }

    const deleteItem = async () => {
        const item = { list, id, content }
        try {
            const res = await axios.delete('/item/delete', { data: item })
            const { data: { msg }, status } = res
            setAlert({ msg, status })
            removeItem(id)
        } catch (err) {
            const { data: { msg }, status} = err.response
            setAlert({ msg, status })
        }
    }

    const openMenu = (e) => {
        e.stopPropagation()
        // console.log(e.target, e.currentTarget, e);
        // if (e.target === e.currentTarget) {
        // if (e.currentTarget.classList.contains("menu-backdrop") || e.currentTarget.classList.contains("list-item")) {
            setMenu(!menu)
        // }
        // const style = selectedListItem.current.style
        // menu ? selectedListItem.current.removeAttribute("style") :
        //     style.boxShadow = "1px 1px 4px 0 rgba(0, 0, 0, 0.4)"
    }

    // const revealNotes = (e) => {
    //     e.stopPropagation()
    //     setShowNotes(!showNotes)
    // }

    let flagStyle = {
        position: "absolute",
        top: "6px",
        left: "-26px"
    }

    return (
        edit ?
            <Input content={content} undoEdit={undoEdit} id={id} aria-label="Editing list item"/>
            :
            <Fragment>
                {/* {menu && <div className="menu-backdrop" onClick={openMenu}></div>} */}
                <li
                    onClick={openMenu}
                    ref={selectedListItem}
                    className={moved ? "no-bullet-point list-item" : "list-item"}
                >
                    <div className="list-wrapper">
                        {moved && <TurnedInNotIcon style={flagStyle} />}

                        <span ref={listItemText} className={style}>{content}</span>
                        {notes.length ? 
                            <FormatListBulletedIcon />
                            :
                            <NotesIcon />}
                        <CSSTransition
                            in={menu}
                            timeout={300}
                            classNames="revealnotes"
                            unmountOnExit
                        >
                            <Notes 
                                notes={notes} 
                                // revealNotes={revealNotes}
                                openMenu={openMenu}
                                list={list} 
                                id={id}
                                carryOver={carryOver}
                                // listItemText={listItemText}
                                style={itemStyle}
                                cross={cross}
                                deleteItem={deleteItem}
                                setEdit={setEdit}
                            />
                        </CSSTransition>
                    </div>
                    {/* <div>
                        <CSSTransition
                            classNames="revealmenu"
                            timeout={200}
                            in={menu}
                            unmountOnExit
                        >
                            <div className="menu" >
                                <div>
                                    {listItemText.current && listItemText.current.classList.contains("strikethrough") ?
                                        <UndoIcon onClick={cross} aria-label="Mark as incomplete"/>
                                        :
                                        <StrikethroughSIcon onClick={cross} aria-label="Mark as complete"/>}
                                    <EditIcon onClick={() => setEdit(true)} aria-label="Edit list item"/>
                                    <ForwardIcon onClick={carryOver} aria-label="Move list item to next day"/>
                                    <DeleteIcon onClick={deleteItem} aria-label="Delete list item"/>
                                </div>
                            </div>
                        </CSSTransition>
                    </div> */}
                </li>
            </Fragment>
    )
}

export default List
