import React, { useContext } from 'react'
import Alert from "../components/Alert"
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AuthContext from "../context/AuthContext"

const EditProfile = () => {
    const authContext = useContext(AuthContext)
    const { name, email } = authContext.user

    return (
        <div className="position-div inside-cover">
            <div className="grid-div">
                <div className="page">
                    <div className="heading">
                        <Link className="profile-nav" to="/today">
                            <ArrowBackIosIcon></ArrowBackIosIcon>
                            Back
                        </Link>
                        <h1 className="profile-heading">Profile Settings</h1>
                    </div>
                    <div className="pattern__wrapper" style={{ overflowY: "auto", overflowX: "visible" }}>
                        <div className="pattern" style={{ repeatingLinearGradient: "unset" }}>
                            <img
                                src="./images/Bald-Eagle.png"
                                className="watermark"
                                alt="watermark"
                            />
                            <div className="content">
                                <div>
                                    {name}
                                    {email}
                                </div>
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
