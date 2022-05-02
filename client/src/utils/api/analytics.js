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

export const submitUserInfoUpdates = (user, dispatch) => {
  axios
    .patch("/admin/users/user", user)
    .then(res => dispatch({ type: "UPDATE_USER", payload: res.data.user }))
    .catch(err => console.log(err.response.data.msg))
}

export const deleteUser = async (_id, dispatch) => {
  try {
    const res = await axios.delete(`/admin/users/user/${_id}`)
    // console.log(res)
    dispatch({ type: "REMOVE_DELETED" })
    return res.statusText === "OK"
  } catch (error) {
    console.error(error)
  }
  // axios
  //   .delete(`/admin/users/user/${_id}`)
  //   .then(res => console.log(res))
  //   .catch(console.error)
}
