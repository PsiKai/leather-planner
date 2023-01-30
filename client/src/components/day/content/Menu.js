import React from "react"

import EditIcon from "@material-ui/icons/Edit"
import ForwardIcon from "@material-ui/icons/Forward"
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS"
import UndoIcon from "@material-ui/icons/Undo"
import DeleteIcon from "@material-ui/icons/Delete"

const Menu = ({ cross, setEdit, carryOver, deleteItem, style }) => {
  return (
    <div className="menu">
      <ul className="menu-action-list">
        <li>
          {style === "strikethrough" ? (
            <button type="button" className="menu-action-button" onClick={cross}>
              <UndoIcon aria-label="Mark as incomplete" />
            </button>
          ) : (
            <button type="button" className="menu-action-button" onClick={cross}>
              <StrikethroughSIcon aria-label="Mark as complete" />
            </button>
          )}
        </li>
        <li>
          <button type="button" className="menu-action-button" onClick={() => setEdit(true)}>
            <EditIcon aria-label="Edit list item" />
          </button>
        </li>
        <li>
          <button type="button" className="menu-action-button" onClick={carryOver}>
            <ForwardIcon aria-label="Move list item to next day" />
          </button>
        </li>
        <li>
          <button type="button" className="menu-action-button" onClick={deleteItem}>
            <DeleteIcon aria-label="Delete list item" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Menu
