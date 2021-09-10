import React, { useContext, useState, useRef, Fragment } from 'react'
import penCross from '../../../sounds/penCross1.wav';
import AppContext from '../../../context/application/AppContext';
import AuthContext from '../../../context/authentication/AuthContext';
import Input from "./Input"

import axios from "axios"

import EditIcon from '@material-ui/icons/Edit';
import ForwardIcon from '@material-ui/icons/Forward';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';

import { CSSTransition, TransitionGroup } from 'react-transition-group'


const List = ({ list, id, moved, style, content }) => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const { crossOff, removeItem } = appContext
    const { setAlert } = authContext

    const [menu, setMenu] = useState(false)
    const [edit, setEdit] = useState(false)

    const listItemText = useRef()
    const selectedListItem = useRef()

    const cross = () => {
        const strike = listItemText.current.classList
        strike.toggle("strikethrough")
        var audio = new Audio(penCross);
        strike.value && audio.play();
        const item = { list, id, style }
        crossOff(item);
    }

    const undoEdit = () => {
        setEdit(false)
    }

    const carryOver = async () => {
        const { classList: [value] } = listItemText.current
        var item = { list, style: value, content }
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
        const style = selectedListItem.current.style
        setMenu(!menu)
        menu ? selectedListItem.current.removeAttribute("style") :
            style.boxShadow = "1px 1px 4px 0 rgba(0, 0, 0, 0.4)"
    }


    let flagStyle = {
        position: "absolute",
        top: "8px",
        left: "-26px"
    }



    return (
        edit ?
            <Input content={content} undoEdit={undoEdit} id={id}/>
            :
            <Fragment>
                {menu && <div className="menu-backdrop" onClick={openMenu}></div>}
                <li
                    onClick={openMenu}
                    ref={selectedListItem}
                    className={moved ? "no-bullet-point" : ""}
                >
                    <div className="list-wrapper">
                        {moved && <TurnedInNotIcon style={flagStyle} />}

                        <span ref={listItemText} className={style}>{content}</span>
                    </div>
                    <TransitionGroup>
                        {menu &&
                            <CSSTransition
                                classNames="revealmenu"
                                timeout={200}
                                key={id}
                            >
                                <div className="menu" >
                                    <div>
                                        {listItemText.current.classList.contains("strikethrough") ?
                                            <UndoIcon onClick={cross} />
                                            :
                                            <StrikethroughSIcon onClick={cross} />}
                                        <EditIcon onClick={() => setEdit(true)} />
                                        <ForwardIcon onClick={carryOver} />
                                        <DeleteIcon onClick={deleteItem} />
                                    </div>
                                </div>
                            </CSSTransition>}
                    </TransitionGroup>
                </li>
            </Fragment>
    )
}

export default List
