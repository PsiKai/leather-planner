import React, { useEffect } from "react"
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined"
import { CSSTransition } from "react-transition-group"

const Modal = ({ children, onDismiss, show }) => {
  useEffect(() => {
    const handleKeyboardDismiss = e => {
      if (e.key === "Escape") onDismiss()
    }
    window.addEventListener("keydown", handleKeyboardDismiss)
    return () => window.removeEventListener("keydown", handleKeyboardDismiss)
  }, [onDismiss])

  const handleLightDismiss = e => {
    if (e.target.classList.contains("modal-backdrop")) {
      onDismiss()
    }
  }

  return (
    <CSSTransition timeout={400} classNames="modal-content" in={show} unmountOnExit>
      <div className="modal-backdrop" onClick={handleLightDismiss}>
        <div className="modal">
          <button className="modal-close-button" onClick={onDismiss}>
            <CloseOutlinedIcon />
          </button>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}

export default Modal
