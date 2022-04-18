import React from "react"

import EditIcon from "@material-ui/icons/Edit"
import ForwardIcon from "@material-ui/icons/Forward"
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS"
import UndoIcon from "@material-ui/icons/Undo"
import DeleteIcon from "@material-ui/icons/Delete"

const Menu = ({ cross, setEdit, carryOver, deleteItem, style }) => {
  return (
    <div className="menu">
      <div>
        {style === "strikethrough" ? (
          <button type="button" className="menu-action-button" onClick={cross}>
            <UndoIcon aria-label="Mark as incomplete" />
          </button>
        ) : (
          <button type="button" className="menu-action-button" onClick={cross}>
            <StrikethroughSIcon aria-label="Mark as complete" />
          </button>
        )}
        <button type="button" className="menu-action-button" onClick={() => setEdit(true)}>
          <EditIcon aria-label="Edit list item" />
        </button>
        <button type="button" className="menu-action-button" onClick={carryOver}>
          <ForwardIcon aria-label="Move list item to next day" />
        </button>
        <button type="button" className="menu-action-button" onClick={deleteItem}>
          <DeleteIcon aria-label="Delete list item" />
        </button>
      </div>
    </div>
  )
}

export default Menu
