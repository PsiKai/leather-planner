import axios from "axios"

export const notesApi = {
  create: (note, dispatch) => {
    axios
      .post("/item/notes", { note })
      .then(res => dispatch({ type: "SET_ITEM", payload: res.data }))
      .catch(console.error)
  },

  update: (note, dispatch) => {
    axios
      .patch("/item/notes", { note })
      .then(res => dispatch({ type: "SET_ITEM", payload: res.data }))
      .catch(console.error)
  },

  delete: (note, dispatch) => {
    axios
      .delete("/item/notes", { data: note })
      .then(res => dispatch({ type: "SET_ITEM", payload: res.data }))
      .catch(console.error)
  },
}
