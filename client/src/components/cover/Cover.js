import React, {Fragment, useEffect, useContext, useState} from 'react';
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import AuthContext from "../../context/authentication/AuthContext"
// import M from "materialize-css/dist/js/materialize.min.js";
import Alert from "../Alert"

import { CSSTransition } from 'react-transition-group';

const Cover = (props) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, token, logOut} = authContext;
    const [login, openLogin] = useState(false)
    const [register, openRegister] = useState(false)
    
    useEffect(() => {
        if(token) {
            props.history.push("/today")
        } else {
            logOut();
        }
            // Init Materialize JS
            // M.AutoInit();
     //eslint-disable-next-line
    }, [isAuthenticated, props.history])


    return (
    <Fragment>
        <div className="cover">
            <div className="center-div">
                <h1 className="cover-title">DAILY</h1>
                <h1 id="line-two" className="cover-title">PLANNER</h1>
                <div className="cover-btns">
                <button className="btn" onClick={() => openLogin(true)}>Login</button>
                <button className="btn" onClick={()=> {openRegister(true)}}>Register</button>
                </div>
           </div> 
          
        </div>
        
        <CSSTransition
            timeout={400}
            classNames="modal-content"
            in={login}
            unmountOnExit
        >
            <LoginModal openLogin={openLogin}/>
        </CSSTransition>
        <CSSTransition
            timeout={400}
            classNames="modal-content"
            in={register}
            unmountOnExit
        >
            <RegisterModal openRegister={openRegister} />
        </CSSTransition>
        <Alert />
    </Fragment>
    )
}

export default Cover
