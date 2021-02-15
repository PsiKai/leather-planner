import React, {useContext} from 'react'
import AuthContext from "../context/AuthContext"
import ErrorIcon from '@material-ui/icons/Error';
import {CSSTransition, TransitionGroup} from "react-transition-group"

const Alert = () => {
    const authContext = useContext(AuthContext);
    const {alerts} = authContext

    return (
        alerts.length > 0 &&
        <TransitionGroup className="alert-wrapper">
            {alerts.map(alert => (
                <CSSTransition
                    timeout={400}
                    classNames="fadein"
                    key={alert.id}
                >
                    <div key={alert.id} className="alert">
                        <ErrorIcon />
                        <span>{alert.msg}</span>
                    </div>
                </CSSTransition>
            ))}
        </TransitionGroup>
        
    )
}

export default Alert
