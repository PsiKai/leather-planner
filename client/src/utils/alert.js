import { v4 as uuidv4 } from "uuid"

export const setAlert = ({ msg, status }, dispatch) => {
  const id = uuidv4()
  dispatch({ type: "SET_ALERT", payload: { msg, id, status } })
  setTimeout(() => {
    dispatch({ type: "REMOVE_ALERT", payload: id })
  }, 5000)
}
