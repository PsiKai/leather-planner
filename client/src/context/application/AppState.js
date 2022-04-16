import React, { useReducer } from "react"
import axios from "axios"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"
import { GET_LIST, SET_ITEM, REMOVE_ITEM, SET_LOADING } from "../types/types"
import { getFormattedDate } from "../../utils/dates"

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
    getList(resultDate)
  }

  //get list
  const getList = async listName => {
    const res = await axios.get(`/list/new/${listName}`, reqHeaders)
    dispatch({
      type: GET_LIST,
      payload: res.data,
    })
  }

  const setItem = async ({ list, inputText, id }) => {
    let res
    id
      ? (res = await axios.post("/item/edit", { inputText, list, id }, reqHeaders))
      : (res = await axios.post("/item/new", { inputText, list }, reqHeaders))

    dispatch({ type: SET_ITEM, payload: res.data })
    updateMonth(res.data)
  }

  const crossOff = async item => {
    const res = await axios.post("/item/crossoff", { item }, reqHeaders)
    dispatch({ type: "SET_ITEM", payload: res.data })
    updateMonth(res.data)
  }

  const removeItem = id => dispatch({ type: REMOVE_ITEM, payload: id })

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

  const updateMonth = async list => {
    if (state.monthlyLists.length) {
      dispatch({ type: "UPDATE_MONTH", payload: list })
    } else {
      const month = await axios.get(`/list/month/${list.name}`)
      console.log(month)
      dispatch({ type: "SET_MONTH", payload: month.data.lists })
    }
  }

  return (
    <AppContext.Provider
      value={{
        list: state.list,
        items: state.items,
        date: state.date,
        loading: state.loading,
        setLoading,
        removeItem,
        getList,
        setItem,
        crossOff,
        resetDate,
        createNote,
        editNote,
        deleteNote,
        updateMonth,
        state,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
