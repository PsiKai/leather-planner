import React, {useContext, useEffect} from 'react'
import Input from './Input'
import List from './List';
import AppContext from "../context/application/AppContext";
import { CircularProgress } from '@material-ui/core';

const Content = () => {
    const appContext = useContext(AppContext);
    const {list, items} = appContext;

    useEffect(() => {
      appContext.getList(list)
      //eslint-disable-next-line
    }, [list])


    return (
      <div className="content">
        <ul 
          className="list browser-default" 
          id="list"
        >
          {items.map((item, index) => {
            return <List 
                      key={index} 
                      id={index} 
                      content={item.item} 
                      list={list} 
                      style={item.style}
                      moved={item.moved}
                    />
              }
            )
          }
          <Input list={list}/>
        </ul>
      </div>
    )
}

export default Content
