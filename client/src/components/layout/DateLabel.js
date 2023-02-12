import React, { forwardRef } from "react"

const DateLabel = forwardRef(({ className, onClick, children, currentValue }, ref) => (
  <button
    className={`${className} custom-date-button`}
    onClick={onClick}
    ref={ref}
    aria-label={`Change current selection from ${currentValue}`}
  >
    {children}
  </button>
))

export default DateLabel
