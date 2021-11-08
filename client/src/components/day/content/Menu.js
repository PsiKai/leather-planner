import React from 'react'

import EditIcon from '@material-ui/icons/Edit';
import ForwardIcon from '@material-ui/icons/Forward';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';

const Menu = ({ cross, setEdit, carryOver, deleteItem, style }) => {
    return (
        <div className="menu" >
            <div>
                {style === "strikethrough" ?
                    <UndoIcon onClick={cross} aria-label="Mark as incomplete"/>
                    :
                    <StrikethroughSIcon onClick={cross} aria-label="Mark as complete"/>}
                <EditIcon onClick={() => setEdit(true)} aria-label="Edit list item"/>
                <ForwardIcon onClick={carryOver} aria-label="Move list item to next day"/>
                <DeleteIcon onClick={deleteItem} aria-label="Delete list item"/>
            </div>
        </div>
    )
}

export default Menu
