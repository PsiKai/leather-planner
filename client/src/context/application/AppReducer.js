import { GET_LIST, REMOVE_ITEM, SET_ITEM, SET_LOADING } from "../types/types"

//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        list: action.payload.list,
        items: action.payload.items,
        date: action.payload.list,
      }
    case SET_ITEM:
      return {
        ...state,
        items: action.payload.items,
      }
    case REMOVE_ITEM:
      const filteredItems = state.items.filter(({ _id }) => _id !== action.payload)

      return {
        ...state,
        items: filteredItems,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case "SET_MONTH":
      return {
        ...state,
        monthlyLists: action.payload,
      }
    case "UPDATE_MONTH":
      let monthlyLists = [...state.monthlyLists]
      const existingListIndex = monthlyLists.findIndex(list => action.payload.name === list.name)
      if (existingListIndex >= 0) {
        let existingList = monthlyLists[existingListIndex]
        existingList = Object.assign(existingList, action.payload)
        monthlyLists[existingListIndex] = existingList
      } else {
        monthlyLists = [...monthlyLists, action.payload].sort((a, b) => new Date(a.name) - new Date(b.createdAt))
      }
      return {
        ...state,
        monthlyLists,
      }
    default:
      return state
  }
}
