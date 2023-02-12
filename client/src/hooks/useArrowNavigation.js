import { useEffect, useRef, useState } from "react"

const useArrowNavigation = ({ intitalFocus }) => {
  const elementRefs = useRef([])
  const prevFocusRef = useRef()

  const [_focusedDate, setFocusedDate] = useState(intitalFocus)

  useEffect(() => {
    setFocusedDate(intitalFocus)
  }, [intitalFocus])

  const handleKeyDown = e => {
    switch (e.code) {
      case "ArrowLeft":
        setFocusedDate(prev => {
          if (prev > 1) {
            elementRefs.current[prev - 2].focus()
            return prev - 1
          }
          return prev
        })
        break

      case "ArrowRight":
        setFocusedDate(prev => {
          if (prev < elementRefs.current.length) {
            elementRefs.current[prev].focus()
            return prev + 1
          }
          return prev
        })
        break

      case "ArrowDown":
        setFocusedDate(prev => {
          if (prev + 7 <= elementRefs.current.length) {
            elementRefs.current[prev + 6].focus()
            return prev + 7
          }
          return prev
        })
        break

      case "ArrowUp":
        setFocusedDate(prev => {
          if (prev - 7 > 0) {
            elementRefs.current[prev - 8].focus()
            return prev - 7
          }
          return prev
        })
        break

      case "Tab":
        if (e.shiftKey) {
          prevFocusRef.current?.focus()
        }
        break

      case "Escape":
        prevFocusRef.current?.focus()
        break

      default:
        break
    }
  }

  const setInitialChildFocus = e => {
    if (e.target.className.match(/wrapper/)) {
      setFocusedDate(prev => {
        elementRefs.current[prev - 1].focus()
        return prev
      })
      prevFocusRef.current = e.relatedTarget
    }
  }

  return { elementRefs, handleKeyDown, setInitialChildFocus }
}

export default useArrowNavigation
