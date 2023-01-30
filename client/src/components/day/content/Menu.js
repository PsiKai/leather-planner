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
            <button
              aria-label="Mark as incomplete"
              type="button"
              className="menu-action-button"
              onClick={cross}
            >
              <UndoIcon />
            </button>
          ) : (
            <button
              aria-label="Mark as complete"
              type="button"
              className="menu-action-button"
              onClick={cross}
            >
              <StrikethroughSIcon />
            </button>
          )}
        </li>
        <li>
          <button
            aria-label="Edit list item"
            type="button"
            className="menu-action-button"
            onClick={() => setEdit(true)}
          >
            <EditIcon />
          </button>
        </li>
        <li>
          <button
            aria-label="Move list item to next day"
            type="button"
            className="menu-action-button"
            onClick={carryOver}
          >
            <ForwardIcon />
          </button>
        </li>
        <li>
          <button
            aria-label="Delete list item"
            type="button"
            className="menu-action-button"
            onClick={deleteItem}
          >
            <DeleteIcon />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Menu
