import React, { useContext, useState, useRef, Fragment } from 'react'
import AppContext from '../../../context/application/AppContext';
import AuthContext from '../../../context/authentication/AuthContext';
import Input from "./Input"
import Notes from "./Notes"

import axios from "axios"

import playAudio from "../../../utils/playAudio"

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
        setMenu(!menu)
    }

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
                <li
                    onClick={openMenu}
                    ref={selectedListItem}
                    className={moved ? "no-bullet-point" : ""}
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
                                openMenu={openMenu}
                                list={list} 
                                id={id}
                                carryOver={carryOver}
                                style={itemStyle}
                                cross={cross}
                                deleteItem={deleteItem}
                                setEdit={setEdit}
                            />
                        </CSSTransition>
                    </div>
                </li>
            </Fragment>
    )
}

export default List
