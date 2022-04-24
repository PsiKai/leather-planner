const AuthReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isAdmin: action.payload.admin,
      }
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      }
    case "LOG_OUT":
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      }
    case "SET_ALERT":
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      }
    case "REMOVE_ALERT":
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload),
      }
    default:
      return state
  }
}

export default AuthReducer
