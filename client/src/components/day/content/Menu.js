import React from "react"

import EditIcon from "@mui/icons-material/Edit"
import ForwardIcon from "@mui/icons-material/Forward"
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS"
import UndoIcon from "@mui/icons-material/Undo"
import DeleteIcon from "@mui/icons-material/Delete"

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
