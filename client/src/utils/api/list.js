import axios from "axios"

export const updateMonth = (list, dispatch) => {
  axios
    .get(`/list/month/${list}`)
    .then(res => dispatch({ type: "SET_MONTH", payload: res.data.lists }))
    .catch(console.error)
}

export const createList = (list, dispatch) => {
  console.log("create list")
  axios
    .get(`/list/new/${list}`)
    .then(res => dispatch({ type: "GET_LIST", payload: res.data }))
    .catch(console.error)
}
