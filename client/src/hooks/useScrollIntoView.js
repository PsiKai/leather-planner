import React from "react"

const useScrollIntoView = (scrollContainerSelector = "body") => {
  const scrollIntoView = target => {
    const scrollContainer = document.querySelector(scrollContainerSelector)
    const { bottom: scrollBottom, top: scrollTop } = scrollContainer.getBoundingClientRect()
    const { bottom, top } = target.getBoundingClientRect()
    console.log(scrollContainer.scrollHeight, bottom - top, bottom - top <= scrollContainer.scrollHeight)
    if (bottom - scrollTop <= scrollContainer.scrollHeight) return
    scrollContainer.scrollTo(0, bottom - scrollTop)
  }

  return { scrollIntoView }
}

export default useScrollIntoView
