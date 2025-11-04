import React, { useState, useContext, useLayoutEffect, useRef } from "react"
import AppContext from "../../../context/application/AppContext"
import playAudio from "../../../utils/playAudio"
import { setItem } from "../../../utils/api/item"

import AddIcon from "@mui/icons-material/Add"
import CheckIcon from "@mui/icons-material/Check"
import BlockIcon from "@mui/icons-material/Block"
import Fab from "@mui/material/Fab"

import { CSSTransition } from "react-transition-group"

const Input = ({ content = "", id = "", undoEdit, edit = null, autoFocus = false }) => {
  const {
    state: { list },
    dispatch,
  } = useContext(AppContext)

  const [inputText, setInputText] = useState("")
  const fabDomElement = useRef()

  useLayoutEffect(() => setInputText(content), [content])

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
      {edit ? (
        <div className="edit-info-button-group">
          <button
            className="edit-info-form-action"
            type="submit"
            aria-label="Submit list item changes"
          >
            <CheckIcon />
          </button>
          <button
            className="edit-info-form-action"
            type="button"
            onClick={() => undoEdit()}
            aria-label="Cancel list item changes"
          >
            <BlockIcon />
          </button>
        </div>
      ) : (
        <CSSTransition
          nodeRef={fabDomElement}
          in={!!inputText}
          classNames="button-appear"
          timeout={150}
        >
          <Fab ref={fabDomElement} type="submit" className="new-item-submit">
            <AddIcon />
          </Fab>
        </CSSTransition>
      )}
    </form>
  )
}

export default Input
