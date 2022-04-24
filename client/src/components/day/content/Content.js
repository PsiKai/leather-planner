import React, { useContext, useEffect } from "react"
import Input from "./Input"
import List from "./List"
import AppContext from "../../../context/application/AppContext"
import playAudio from "../../../utils/playAudio"
import { createList } from "../../../utils/api/list"

const Content = () => {
  const appContext = useContext(AppContext)
  const { list, items, dispatch } = appContext

  useEffect(() => {
    playAudio("page")
    createList(list, dispatch)
  }, [list, dispatch])

  return (
    <div className="content">
      <ul className="list browser-default" id="list">
        {items.map(({ item, _id, style, moved, notes }) => {
          return <List key={_id} id={_id} item={item} list={list} style={style} moved={moved} notes={notes} />
        })}
        <Input />
      </ul>
    </div>
  )
}

export default Content
