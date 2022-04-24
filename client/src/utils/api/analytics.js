import axios from "axios"

export const getAllUsers = dispatch => {
  axios
    .get("/admin/users")
    .then(res => dispatch({ type: "GET_USERS", payload: res.data }))
    .catch(console.error)
}

export const createUserSnapshot = userData => {
  axios.post("/admin/users", userData).catch(console.error)
}
