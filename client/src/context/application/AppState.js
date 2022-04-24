import React, { useReducer } from "react"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"
import { SET_LOADING } from "../types/types"
import { getFormattedDate } from "../../utils/dates"
import { createList } from "../../utils/api/list"

const AppState = props => {
  var resultDate = getFormattedDate()

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
        state,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
