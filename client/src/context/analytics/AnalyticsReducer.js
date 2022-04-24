const AnalyticsReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_USERS":
      return {
        ...state,
        users: payload.usersWithLists,
        latestSnapshot: payload.lastSnapshot,
        loading: false,
      }
    default:
      return state
  }
}

export default AnalyticsReducer
