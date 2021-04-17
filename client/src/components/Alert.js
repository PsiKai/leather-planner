import React, {useContext} from 'react'
import "../styles/alerts.css"
import AuthContext from "../context/AuthContext"
import ErrorIcon from '@material-ui/icons/Error';
import {CSSTransition, TransitionGroup} from "react-transition-group"

const Alert = () => {
    const authContext = useContext(AuthContext);
    const {alerts} = authContext

    return (
        
        <TransitionGroup className="alert-wrapper">
            {alerts.length > 0 &&
                alerts.map(alert => (
                    <CSSTransition
                        timeout={400}
                        classNames="fadein"
                        key={alert.id}
                    >
                    <div className="alert-border">
                        <div key={alert.id} className="alert">
                            <ErrorIcon />
                            <span>{alert.msg}</span>
                        </div>
                    </div>
                    </CSSTransition>
            ))}
        </TransitionGroup>
        
    )
}

export default Alert
