import React, { useReducer } from "react"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"
import { getFormattedDate } from "../../utils/dates"

const AppState = props => {
  var resultDate = getFormattedDate()

  const intitialState = {
    list: resultDate,
    items: [],
    monthlyLists: [],
  }

  const [state, dispatch] = useReducer(AppReducer, intitialState)

  return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
}

export default AppState
