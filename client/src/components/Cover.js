import React, {Fragment, useEffect, useContext} from 'react';
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import AuthContext from "../context/AuthContext"
import M from "materialize-css/dist/js/materialize.min.js";
import Alert from "../components/Alert"

const Cover = (props) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, token, logOut, setAlert} = authContext;
    
    useEffect(() => {
        if(token) {
            props.history.push("/today")
        } else {
            logOut();
        }
            // Init Materialize JS
            M.AutoInit();
     //eslint-disable-next-line
    }, [isAuthenticated, props.history])


    return (
    <Fragment>
        <div className="cover">
            <div className="center-div">
                <h1 className="cover-title">DAILY</h1>
                <h1 id="line-two" className="cover-title">PLANNER</h1>
                <div className="cover-btns">
                <button href="#loginModal" className="modal-trigger btn">Login</button>
                <button href="#registerModal" className="modal-trigger btn">Register</button>
                </div>
           </div> 
          
        </div>
        <LoginModal />
        <RegisterModal />
        <Alert />
    </Fragment>
    )
}

export default Cover
