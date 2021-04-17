import React, {useReducer} from 'react';
import axios from 'axios';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import {
    GET_LIST,
    SET_ITEM,
    REMOVE_ITEM,
    SET_LOADING
} from "./types";

const AppState = (props) => {
    var date = new Date();
    var options = {day: '2-digit', month: 'short', year: 'numeric'};
    var resultDate = date.toLocaleDateString('en-US', options)
    .replace(/,/g, "").replace(/ /g, "-");

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
            `/date/${listName}`, 
            // {list: listName},
            {"Content-Type": "*/*"}
        )
        dispatch({
            type: GET_LIST,
            payload: res.data
        })
    }

    //set items
    const setItem = async (inputText) => {
        let res
            !inputText.oldItem ?
                res = await axios.post(
                    "/", 
                    {
                        item: inputText.item, 
                        list: inputText.list
                    }, 
                    {"Content-Type": "*/*"}
                ) :
                res = await axios.post(
                    "/edit",
                    {
                        item: inputText.item, 
                        list: inputText.list,
                        oldText: inputText.oldItem
                    },
                    {"Content-Type": "*/*"}
                )
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
             {"Content-Type": "*/*"}
        )
    }

    // const moveItem = async (item) => {
    //     const res = await axios.post(
    //         "/move",
    //         item,
    //         {"Content-Type": "*/*"}
    //     )
    //     console.log(res.data.msg);
    // }

    const removeItem = ({item}) => {
        dispatch({
            type: REMOVE_ITEM,
            payload: item
        })
    };

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