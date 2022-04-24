import React, { useReducer } from "react"
import axios from "axios"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"
import { SET_ITEM, SET_LOADING } from "../types/types"
import { getFormattedDate } from "../../utils/dates"
import { createList } from "../../utils/api/list"

const AppState = props => {
  var resultDate = getFormattedDate()

  const reqHeaders = { "Content-Type": "*/*" }

  const intitialState = {
    list: resultDate,
    items: [],
    date: resultDate,
    loading: false,
    monthlyLists: [],
  }

  const [state, dispatch] = useReducer(AppReducer, intitialState)

  //reset date to day after logout
  const resetDate = () => {
    createList(resultDate, dispatch)
  }

  const createNote = async note => {
    try {
      const res = await axios.post("/item/notes", { note }, reqHeaders)
      dispatch({ type: SET_ITEM, payload: res.data })
    } catch (error) {
      console.log(error.response.msg)
    }
  }

  const editNote = async note => {
    try {
      const res = await axios.patch("/item/notes", { note }, reqHeaders)
      dispatch({ type: SET_ITEM, payload: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async note => {
    try {
      const res = await axios.delete("/item/notes", { data: note })
      dispatch({ type: SET_ITEM, payload: res.data })
    } catch (error) {
      console.log(error.response.msg)
    }
  }

  const setLoading = bool => {
    dispatch({
      type: SET_LOADING,
      payload: bool,
    })
  }

  return (
    <AppContext.Provider
      value={{
        list: state.list,
        items: state.items,
        date: state.date,
        loading: state.loading,
        setLoading,
        resetDate,
        createNote,
        editNote,
        deleteNote,
        state,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
