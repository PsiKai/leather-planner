const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_LIST":
      return {
        ...state,
        ...payload,
      }
    case "SET_ITEM":
      return {
        ...state,
        items: payload.items,
      }
    case "SET_MONTH":
      return {
        ...state,
        monthlyLists: payload,
      }
    case "CLEAR_MONTH":
      return {
        ...state,
        monthlyLists: [],
      }
    default:
      return state
  }
}

export default AppReducer
