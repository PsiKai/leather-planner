import axios from "axios"

import { setAlert } from "../alert"

export const setItem = (item, dispatch, monthlyLists) => {
  axios
    .post(`/item/${item.id ? "edit" : "new"}`, item)
    .then(res => {
      dispatch({ type: "SET_ITEM", payload: res.data })
      refreshMonth(res.data, monthlyLists, dispatch)
    })
    .catch(console.error)
}

export const crossOffItem = (item, dispatch, monthlyLists) => {
  axios
    .post("/item/crossoff", { item })
    .then(res => {
      dispatch({ type: "SET_ITEM", payload: res.data })
      refreshMonth(res.data, monthlyLists, dispatch)
    })
    .catch(console.error)
}

export const copyItem = (item, dispatch, monthlyLists, authDispatch) => {
  axios
    .post("/item/move", item)
    .then(res => {
      const {
        data: { msg, newList },
        status,
      } = res
      refreshMonth(newList, monthlyLists, dispatch)
      setAlert({ msg, status }, authDispatch)
    })
    .catch(error => {
      const {
        data: { msg },
        status,
      } = error.response
      setAlert({ msg, status }, authDispatch)
    })
}

export const deleteListItem = (item, dispatch, monthlyLists, authDispatch) => {
  axios
    .delete("/item/delete", { data: item })
    .then(res => {
      const {
        data: { msg, newList },
        status,
      } = res
      dispatch({ type: "SET_ITEM", payload: newList })
      refreshMonth(newList, monthlyLists, dispatch)
      setAlert({ msg, status }, authDispatch)
    })
    .catch(err => {
      const {
        data: { msg },
        status,
      } = err.response
      setAlert({ msg, status }, authDispatch)
    })
}

export const refreshMonth = (list, monthlyLists, dispatch) => {
  if (monthlyLists?.length) {
    dispatch({ type: "UPDATE_MONTH", payload: list })
  } else {
    axios
      .get(`/list/month/${list.name}`)
      .then(res => dispatch({ type: "SET_MONTH", payload: res.data.lists }))
      .catch(console.error)
  }
}
