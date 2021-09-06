import React, { useContext, useEffect } from 'react'
import Alert from "../Alert"
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PersonIcon from '@material-ui/icons/Person';
import AuthContext from "../../context/authentication/AuthContext"

import pageFlip from "../../sounds/page-flip.wav"
import EditInfo from './EditInfo';
import PasswordField from './PasswordField';

const EditProfile = () => {
    const authContext = useContext(AuthContext)
    useEffect(() => {  
        
        authContext.getUser();     
        var audio = new Audio(pageFlip);
        audio.volume = 0.1;
        audio.play();
        //eslint-disable-next-line
    }, [])


    return (
        <div className="position-div inside-cover">
            <div className="grid-div">
                <div className="page">
                    <div className="heading">
                        <Link className="profile-nav" to="/today">
                            <ArrowBackIosIcon />
                            Back
                        </Link>
                        <h1 className="profile-heading">
                            Profile Settings
                            <PersonIcon />
                        </h1>
                    </div>
                    <div className="pattern__wrapper" style={{ overflowY: "auto", overflowX: "visible" }}>
                        <div className="pattern">
                            <img
                                src="./images/Bald-Eagle.png"
                                className="watermark"
                                alt="watermark"
                            />
                            <div className="content">
                                <EditInfo />
                                <PasswordField />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img
                className="binder-rings"
                src="./images/binder-rings.png"
                alt="binder rings"
            />
            <img
                className="binder-rings-two"
                src="./images/binder-rings.png"
                alt="binder rings"
            />
            <Alert />
        </div>
    )
}

export default EditProfile
