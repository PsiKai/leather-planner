import React, {useContext, useEffect} from 'react'
import Input from './Input'
import List from './List';
import AppContext from "../../../context/application/AppContext";

const Content = () => {
    const appContext = useContext(AppContext);
    const { list, items, getList } = appContext;

    useEffect(() => {
      getList(list)
      //eslint-disable-next-line
    }, [list])

    return (
      <div className="content">
        <ul className="list browser-default" id="list">
          {items.map(({ item, _id, style, moved, notes}) => {
            return <List 
                      key={_id}
                      id={_id}
                      content={item} 
                      list={list} 
                      style={style}
                      moved={moved}
                      notes={notes}
                    />
            }
          )}
          <Input/>
        </ul>
      </div>
    )
}

export default Content
