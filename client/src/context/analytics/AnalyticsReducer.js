const AnalyticsReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_USERS":
      console.log(payload.usersWithLists)
      return {
        ...state,
        users: payload.usersWithLists,
        latestSnapshot: payload.lastSnapshot,
        loading: false,
      }

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      }
    case "SET_TOTAL_USERS":
      return {
        ...state,
        totalUsers: payload,
      }
    default:
      return state
  }
}

export default AnalyticsReducer
