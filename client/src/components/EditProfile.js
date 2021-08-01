import React from 'react'
import Alert from "../components/Alert"

const EditProfile = () => {
    return (
        <div className="position-div inside-cover">
            <div className="grid-div">
                <div className="page">
                    <div className="heading">
                        <h1 className="profile-heading">Profile Settings</h1>
                    </div>
                    <div className="pattern__wrapper" style={{ overflowY: "auto", overflowX: "visible" }}>
                        <div className="pattern">
                            <img
                                src="./images/Bald-Eagle.png"
                                className="watermark"
                                alt="watermark"
                            />
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
