import React, {useState, useContext, useEffect} from 'react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import pen1 from '../../../sounds/Pen1.wav';
import pen2 from '../../../sounds/Pen2.wav';
import AppContext from "../../../context/application/AppContext";
import {CSSTransition} from "react-transition-group"

const Input = ({content="", id="", undoEdit}) => {
    const appContext = useContext(AppContext);
    const {list, setItem} = appContext;

    const [inputText, setInputText] = useState("");
    // const [editText, setEditText] = useState("");

    useEffect(() => {
        setInputText(content)
        // text && setEditText(text)
    }, [])

    // let newItem = {
    //     list: list,
    //     item: inputText,
    //     oldItem: editText
    // }

    const typing = (e) => {
        const {value} = e.target;
        setInputText(value);
    }

    const create = (e) => {
        e.preventDefault();
        const item = { list, inputText, id }
        if (inputText) {
            setItem(item)
            setInputText("");
            // setEditText("")
            
            var penNoises = [pen1, pen2];
            var audio = new Audio(
                penNoises[Math.floor(Math.random() * penNoises.length)]
            );
            audio.volume = 0.1;
            audio.play();
            undoEdit && undoEdit()
        }
    }

    const submitButtonStyle = {
        maxHeight: "30px",
        minHeight: "30px",
        minWidth: "30px",
        maxWidth: "30px",
    };

    return (
        <li className="browser-default">
            <form className="button" onSubmit={create}>
                <input
                    name="newItem"
                    className="new-item browser-default"
                    type="text"
                    placeholder="Plan your day ..."
                    autoComplete="off"
                    value={inputText}
                    onChange={typing}
                />
                <CSSTransition
                    in={!!inputText}
                    classNames="button-appear"
                    timeout={150}
                    unmountOnExit
                >
                    <Fab type="submit" style={submitButtonStyle}><AddIcon /></Fab>
                </CSSTransition>
            </form>
        </li>
    )
}

export default Input
