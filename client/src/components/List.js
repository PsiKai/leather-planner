import React, {useContext, useState, useRef} from 'react'
import penCross from '../sounds/penCross1.wav';
import AppContext from '../context/AppContext';
import AuthContext from '../context/AuthContext';
import Input from "./Input"
import EditIcon from '@material-ui/icons/Edit';
import ForwardIcon from '@material-ui/icons/Forward';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import UndoIcon from '@material-ui/icons/Undo';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';


const List = (props) => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const [menu, setMenu] = useState(false)
    const [edit, setEdit] = useState(false)
    const listItemText = useRef()
    const {crossOff} = appContext
    const {moveItem} = authContext

    
    const cross = () => {
        const strike = listItemText.current.classList
        strike.toggle("strikethrough")
        var audio = new Audio(penCross);
        strike.value === "strikethrough" && audio.play();
        var item = {
            list: props.list, 
            item: listItemText.current.innerHTML, 
            id: props.id, 
            style: listItemText.current.classList.value
        }
        crossOff(item);
    }

    const undoEdit = () => {
        setEdit(false)
    }

    const carryOver = () => {
        var item = {
            list: props.list, 
            item: listItemText.current.innerHTML, 
            id: props.id, 
            style: listItemText.current.classList.value
        }
        moveItem(item)
    }


    return (
        !edit ?
        <li onClick={() => setMenu(!menu)}>
            <div className="list-wrapper">
                {props.moved && <LabelImportantIcon />}
                <span ref={listItemText} className={props.style}>{props.content}</span>
            </div>
            
            {menu && 
                <div className="menu" style={{opacity: "1"}}>
                    <div>
                        {listItemText.current.classList.contains("strikethrough") ?
                            <UndoIcon onClick={cross}/>
                            :
                            <StrikethroughSIcon onClick={cross}/>}
                        <EditIcon onClick={() => setEdit(true)} />
                        <ForwardIcon onClick={carryOver}/>
                    </div>
                </div>}
        </li>
        :
        <Input text={props.content} undoEdit={undoEdit}/>
    )
}

export default List
