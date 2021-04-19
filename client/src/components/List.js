import React, {useContext, useState, useRef, Fragment} from 'react'
import penCross from '../sounds/penCross1.wav';
import AppContext from '../context/AppContext';
import AuthContext from '../context/AuthContext';
import Input from "./Input"
import EditIcon from '@material-ui/icons/Edit';
import ForwardIcon from '@material-ui/icons/Forward';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import UndoIcon from '@material-ui/icons/Undo';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import DeleteIcon from '@material-ui/icons/Delete';
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const List = ({list, id, moved, style, content}) => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const {crossOff, removeItem} = appContext
    const {moveItem, deleteItem} = authContext

    const [menu, setMenu] = useState(false)
    const [edit, setEdit] = useState(false)

    const listItemText = useRef()
    const selectedListItem = useRef()
    
    
    const cross = () => {
        const strike = listItemText.current.classList
        strike.toggle("strikethrough")
        var audio = new Audio(penCross);
        strike.value === "strikethrough" && audio.play();
        var item = {
            list: list, 
            item: listItemText.current.innerHTML, 
            id: id, 
            style: listItemText.current.classList.value
        }
        crossOff(item);
    }

    const undoEdit = () => {
        setEdit(false)
    }

    const carryOver = () => {
        var item = {
            list: list, 
            item: listItemText.current.innerHTML, 
            id: id, 
            style: listItemText.current.classList.value
        }
        moveItem(item)
    }

    const deleteCurrentItem = async () => {
        var item = {
            list: list,
            item: listItemText.current.innerHTML
        }
        const status = await deleteItem(item)
        status === 200 && removeItem(item)
    }

    const openMenu = (e) => {
        const style = selectedListItem.current.style
        setMenu(!menu)
        menu ? selectedListItem.current.removeAttribute("style") : 
            style.boxShadow = "1px 1px 4px 0 rgba(0, 0, 0, 0.4)"
    }


    return (
        !edit ?
        <Fragment>
            {menu && <div className="menu-backdrop" onClick={openMenu}></div>}
            <li onClick={openMenu} ref={selectedListItem}>
                <div className="list-wrapper">
                    {moved && <LabelImportantIcon />}
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
                                        <UndoIcon onClick={cross}/>
                                        :
                                        <StrikethroughSIcon onClick={cross}/>}
                                    <EditIcon onClick={() => setEdit(true)} />
                                    <ForwardIcon onClick={carryOver}/>
                                    <DeleteIcon onClick={deleteCurrentItem} />
                                </div>
                            </div>
                        </CSSTransition>}
                </TransitionGroup>
            </li>
        </Fragment>
        :
        <Input text={content} undoEdit={undoEdit}/>
    )
}

export default List
