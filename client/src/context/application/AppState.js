import React, {useReducer} from 'react';
import axios from 'axios';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import {
    GET_LIST,
    SET_ITEM,
    REMOVE_ITEM,
    SET_LOADING
} from "../types/types";

const AppState = (props) => {
    var date = new Date();
    var options = {day: '2-digit', month: 'short', year: 'numeric'};
    var resultDate = date.toLocaleDateString('en-US', options)
    .replace(/,/g, "").replace(/ /g, "-");

    const reqHeaders = {"Content-Type": "*/*"}

    const intitialState = {
        list: resultDate,
        items: [],
        date: resultDate,
        loading: false
    }

    const [state, dispatch] = useReducer(AppReducer, intitialState);

    //reset date to day after logout
    const resetDate = () => {
        getList(resultDate)
    }

    //get list
    const getList = async (listName) => {
        const res = await axios.get(
            `/list/new/${listName}`,
            reqHeaders
        )
        dispatch({
            type: GET_LIST,
            payload: res.data
        })
    }


    const setItem = async ({ list, inputText, id }) => {
        let res
        id ?
            res = await axios.post("/item/edit", { inputText, list, id }, reqHeaders)
            :
            res = await axios.post("/item/new", { inputText, list },  reqHeaders ) 
        
        dispatch({ type: SET_ITEM, payload: res.data })   
    }


    const crossOff = async (item) => {
         await axios.post("/item/crossoff", { item }, reqHeaders)
    }

    const removeItem = id => dispatch({ type: REMOVE_ITEM, payload: id })
    

    const setLoading = (bool) => {
        dispatch({
            type: SET_LOADING,
            payload: bool
        })
    }
  
    return (
        <AppContext.Provider
            value={{
                list: state.list,
                items: state.items,
                date: state.date,
                // moveItem,
                loading: state.loading,
                setLoading,
                removeItem,
                getList,
                setItem,
                crossOff,
                resetDate
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState;