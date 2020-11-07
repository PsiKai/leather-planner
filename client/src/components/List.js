import React, {useContext} from 'react'
import penCross from '../sounds/penCross1.wav';
import AppContext from '../context/AppContext';


const List = (props) => {
    const appContext = useContext(AppContext);

    const cross = (e) => {
        var strike = e.target.classList
        strike.toggle("strikethrough")
        var audio = new Audio(penCross);
        strike.value === "strikethrough" && audio.play();
        var item = {
            list: props.list, 
            item: e.target.innerHTML, 
            id: props.id, 
            style: strike.value
        }
        appContext.crossOff(item);
    }

    return (
        <li 
            onClick={cross} 
            className={props.style}
        >
            {props.content}
        </li>
    )
}

export default List
