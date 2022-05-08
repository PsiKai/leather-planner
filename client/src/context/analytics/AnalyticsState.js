import React, { useReducer } from "react"
import AnalyticsContext from "./AnalyticsContext"
import AnalyticsReducer from "./AnalyticsReducer"

const AnalyticsState = props => {
  const intitialState = {
    users: [],
    totalUsers: 0,
    loading: true,
  }
  const [state, dispatch] = useReducer(AnalyticsReducer, intitialState)

  return <AnalyticsContext.Provider value={{ state, dispatch }}>{props.children}</AnalyticsContext.Provider>
}

export default AnalyticsState
