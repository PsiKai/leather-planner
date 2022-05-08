const AnalyticsReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_USERS":
      return {
        ...state,
        users: payload.users,
        totalUsers: payload.totalResults || 0,
        loading: false,
      }
    case "SET_USER_FILTER":
      return {
        ...state,
        users: payload.users,
        totalUsers: payload.totalResults || 0,
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
    case "UPDATE_USER":
      const users = [...state.users]
      const foundUser = users.findIndex(user => user._id === payload._id)
      users[foundUser] = Object.assign(users[foundUser], payload)
      return {
        ...state,
        users,
        loading: false,
      }
    case "REMOVE_DELETED":
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default AnalyticsReducer
