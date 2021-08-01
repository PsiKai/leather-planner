import React, { useContext, useState, useEffect } from 'react'
import Alert from "../components/Alert"
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AuthContext from "../context/AuthContext"

const EditProfile = () => {
    const authContext = useContext(AuthContext)
    const { user, getUser } = authContext
    const { name, email } = user ?? {}

    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [info, setInfo] = useState({ name, email })

    useEffect(() => {
        getUser();
        //eslint-disable-next-line
    }, [])

    const editInfo = (e) => {
        const { name, value } = e.target
        setInfo((prevInfo) => {
            return { ...prevInfo, [name]: value }
        })
    }

    const submitInfo = (e) => {
        e.preventDefault()
        const { name } = e.target[0]
        name === "name" ? setEditName(false) : setEditEmail(false)
    }

    return (
        <div className="position-div inside-cover">
            <div className="grid-div">
                <div className="page">
                    <div className="heading">
                        <Link className="profile-nav" to="/today">
                            <ArrowBackIosIcon />
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
                                {user && <div className="profile--wrapper">
                                    <label className="profile--label" htmlFor="username">Username:</label>
                                    {editName ?
                                        <form onSubmit={submitInfo}>
                                            <input className="browser-default" name="name" type="text" onChange={editInfo} value={info.name}></input>
                                            <button type="submit">Submit</button>
                                        </form>
                                        :
                                        <p id="username" className="profile--info" onClick={() => setEditName(true)}>{name}</p>}
                                    <label className="profile--label" htmlFor="email">Email:</label>
                                    {editEmail ?
                                        <form onSubmit={submitInfo}>
                                            <input className="browser-default" name="email" type="text" onChange={editInfo} value={info.email}></input>
                                            <button type="submit">Submit</button>
                                        </form>
                                        :
                                        <p id="email" className="profile--info" onClick={() => setEditEmail(true)}>{email}</p>}
                                </div>}
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
