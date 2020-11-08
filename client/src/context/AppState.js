import React, {useReducer} from 'react';
import axios from 'axios';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import {
    GET_LIST,
    SET_ITEM,
} from "./types";

const AppState = (props) => {
    var date = new Date();
    var options = {day: '2-digit', month: 'short', year: 'numeric'};
    var resultDate = date.toLocaleDateString('en-US', options)
    .replace(/,/g, "").replace(/ /g, "-");

    const intitialState = {
        list: resultDate,
        items: [],
        date: resultDate
    }

    const [state, dispatch] = useReducer(AppReducer, intitialState);

    //get list
    const getList = async (listName) => {
        const res = await axios.get(
            `today/${listName}`, 
            {list: listName},
            {"Content-Type": "*/*"}
        )
        dispatch({
            type: GET_LIST,
            payload: res.data
        })
    }

    //set items
    const setItem = async (inputText) => {
        const res = await axios.post(
            "/", 
            {
                item: inputText.item, 
                list: inputText.list
            }, 
            {"Content-Type": "*/(*"}
        );
        dispatch({
            type: SET_ITEM,
            payload: res.data
        })   
    }

    // set strikethrough
    const crossOff = async (item) => {
         await axios.post(
             "/delete", 
             {
                item: item.item, 
                list: item.list, 
                style: item.style},
             {
                "Content-Type": "*/(*"
            }
        )
    }
  
    return (
        <AppContext.Provider
            value={{
                list: state.list,
                items: state.items,
                date: state.date,
                getList,
                setItem,
                crossOff
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;