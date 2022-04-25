import axios from "axios"

export const getAllUsers = (skip, limit, dispatch) => {
  axios
    .get(`/admin/users/${skip}/${limit}`)
    .then(res => dispatch({ type: "GET_USERS", payload: res.data }))
    .catch(console.error)
}

export const createUserSnapshot = userData => {
  axios.post("/admin/users", userData).catch(console.error)
}

export const sumUsers = dispatch => {
  axios
    .get("/admin/users/total")
    .then(res => dispatch({ type: "SET_TOTAL_USERS", payload: res.data.total }))
    .catch(console.error)
}
