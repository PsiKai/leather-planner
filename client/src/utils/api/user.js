import axios from "axios"
import setAuthToken from "../setAuthToken"
import { setAlert } from "../alert"

export const getUser = dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  } else {
    dispatch({ type: "LOG_OUT" })
    setAlert({ status: 401, msg: "You have been logged out" }, dispatch)
  }
  axios
    .get("/user/auth")
    .then(res => dispatch({ type: "USER_LOADED", payload: res.data }))
    .catch(err => {
      dispatch({ type: "LOG_OUT" })
      const {
        data: { msg },
        status,
      } = err.response
      setAlert({ status, msg }, dispatch)
      console.error(err.response, this)
    })
}

export const updateUser = (payload, dispatch) => {
  axios
    .patch("/user/update", payload)
    .then(res => {
      const {
        data: { msg, user },
        status,
      } = res
      dispatch({ type: "USER_LOADED", payload: user })
      setAlert({ status, msg }, dispatch)
    })
    .catch(error => {
      const { status, msg } = error.response
      setAlert({ status, msg }, dispatch)
    })
}

export const login = (formData, dispatch, route) => {
  axios
    .post(`/user/${route}`, formData)
    .then(res => dispatch({ type: "LOGIN_SUCCESS", payload: res.data }))
    .catch(err => {
      const {
        data: { msg },
        status,
      } = err.response
      setAlert({ msg, status }, dispatch)
      dispatch({ type: "LOG_OUT" })
    })
}

export const logOut = dispatch => dispatch({ type: "LOG_OUT" })
