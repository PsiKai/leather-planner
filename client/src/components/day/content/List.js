import React, { useContext, useState, useRef } from "react"
import AppContext from "../../../context/application/AppContext"
import AuthContext from "../../../context/authentication/AuthContext"
import Input from "./Input"
import Notes from "./Notes"

import playAudio from "../../../utils/playAudio"
import { copyItem, crossOffItem, deleteListItem } from "../../../utils/api/item"

import TurnedInNotIcon from "@material-ui/icons/TurnedInNot"
import TurnedInIcon from "@material-ui/icons/TurnedIn"
import NotesIcon from "@material-ui/icons/Notes"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { CSSTransition } from "react-transition-group"

const List = ({ list, id, moved, style, item, notes }) => {
  const {
    dispatch,
    state: { monthlyLists },
  } = useContext(AppContext)
  const { dispatch: authDispatch } = useContext(AuthContext)

  const [menu, setMenu] = useState(false)
  const [edit, setEdit] = useState(false)
  const [itemStyle, setItemStyle] = useState(style)

  const listItemText = useRef()

  const cross = () => {
    const strike = listItemText.current.classList
    strike.toggle("strikethrough")
    strike.value && playAudio("cross")
    const item = { list, id, style }
    setItemStyle(strike.value)
    crossOffItem(item, dispatch, monthlyLists)
  }

  const undoEdit = () => {
    setEdit(false)
  }

  const carryOver = () => {
    const {
      classList: [value],
    } = listItemText.current
    var itemToMove = { list, style: value, item, notes }
    copyItem(itemToMove, dispatch, monthlyLists, authDispatch)
  }

  const deleteItem = () => {
    const itemToDelete = { list, id, item }
    deleteListItem(itemToDelete, dispatch, monthlyLists, authDispatch)
  }

  const openMenu = e => {
    e.stopPropagation()
    setMenu(!menu)
  }

  let flagStyle = {
    position: "absolute",
    top: "6px",
    left: "-26px",
  }

  return edit ? (
    <Input content={item} undoEdit={undoEdit} id={id} aria-label="Editing list item" />
  ) : (
    <li onClick={openMenu} className={moved ? "no-bullet-point" : ""}>
      <div className="list-wrapper">
        {moved && itemStyle ? (
          <TurnedInIcon style={{ ...flagStyle, opacity: "0.6" }} />
        ) : (
          moved && <TurnedInNotIcon style={flagStyle} />
        )}

        <span ref={listItemText} className={style}>
          {item}
        </span>
        <button aria-label={`expand-item: ${item}`} className="expand-item">
          {notes?.length ? <NotesIcon /> : <MoreVertIcon />}
        </button>
        <CSSTransition in={menu} timeout={300} classNames="revealnotes" unmountOnExit>
          <Notes
            notes={notes}
            openMenu={openMenu}
            list={list}
            id={id}
            carryOver={carryOver}
            style={itemStyle}
            cross={cross}
            deleteItem={deleteItem}
            setEdit={setEdit}
          />
        </CSSTransition>
      </div>
    </li>
  )
}

export default List
