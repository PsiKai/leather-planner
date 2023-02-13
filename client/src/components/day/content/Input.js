import React, { useState, useContext, useEffect } from "react"
import AppContext from "../../../context/application/AppContext"
import playAudio from "../../../utils/playAudio"
import { setItem } from "../../../utils/api/item"

import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"

import { CSSTransition } from "react-transition-group"

const Input = ({ content = "", id = "", undoEdit, autoFocus = false }) => {
  const {
    state: { list },
    dispatch,
  } = useContext(AppContext)

  const [inputText, setInputText] = useState("")

  useEffect(() => setInputText(content), [content])

  const typing = e => setInputText(e.target.value)

  const create = e => {
    e.preventDefault()
    const item = { list, inputText, id }
    if (inputText) {
      setItem(item, dispatch)
      setInputText("")
      playAudio("write")
      undoEdit && undoEdit()
    }
  }

  return (
    <form className="list-item-form" onSubmit={create}>
      <input
        name="newItem"
        className="new-item"
        type="text"
        placeholder="Plan your day ..."
        autoComplete="off"
        value={inputText}
        onChange={typing}
        aria-label="Create list item"
        autoFocus={autoFocus}
      />
      <CSSTransition in={!!inputText} classNames="button-appear" timeout={150}>
        <Fab type="submit">
          <AddIcon />
        </Fab>
      </CSSTransition>
    </form>
  )
}

export default Input
