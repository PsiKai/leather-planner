import React, { useContext, useState, useEffect } from 'react'
import Alert from "../components/Alert"
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PersonIcon from '@material-ui/icons/Person';
import AuthContext from "../context/AuthContext"
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Fab from '@material-ui/core/Fab';

const EditProfile = () => {
    const authContext = useContext(AuthContext)
    const { user, getUser, setAlert } = authContext
    const { name, email } = user ?? {}

    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [info, setInfo] = useState({ name, email } ?? {})
    const [nameMenu, setNameMenu] = useState(false)

    useEffect(() => {
        getUser();
        setInfo({ name, email })
        //eslint-disable-next-line
    }, [])

    const editInfo = (e) => {
        const { name, value } = e.target
        setInfo((prevInfo) => {
            return { ...prevInfo, [name]: value }
        })
    }

    const submitInfo = async (e) => {
        e.preventDefault()
        const { name, value } = e.target[0]
        console.log(e.target[0]);
        try {
            const res = await axios.patch("/updateUser", { user, name, value })
            const { msg } = res.data
            getUser()
            setAlert(msg)
        } catch (error) {
            setAlert(`Error updating ${name}`)
        }
        name === "name" ? setEditName(false) : setEditEmail(false)
    }

    const fabStyle = {
        maxHeight: "36px",
        minHeight: "36px",
        minWidth: "36px",
        maxWidth: "36px",
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
                        <h1 className="profile-heading">
                            Profile Settings
                            <PersonIcon />
                        </h1>
                    </div>
                    <div className="pattern__wrapper" style={{ overflowY: "auto", overflowX: "visible" }}>
                        <div className="pattern" style={{ repeatingLinearGradient: "unset" }}>
                            <img
                                src="./images/Bald-Eagle.png"
                                className="watermark"
                                alt="watermark"
                            />
                            <div className="content">
                                <div className="profile--wrapper">
                                    <label className="profile--label" htmlFor="username">Username:</label>
                                    {editName ?
                                        <form onSubmit={submitInfo}>
                                            <input
                                                className="new-item browser-default"
                                                name="name"
                                                type="text"
                                                onChange={editInfo}
                                                value={info.name}
                                                autoFocus
                                            />
                                            <div style={{ position: "absolute" }}>
                                                <Fab style={fabStyle} type="submit"><CheckCircleOutlineIcon /></Fab>
                                                <Fab style={fabStyle} onClick={() => setEditName(false)} ><CancelOutlinedIcon /></Fab>
                                            </div>
                                        </form>
                                        :
                                        <p id="username" className="profile--info" onClick={() => { setEditName(true); setNameMenu(true) }}>{name}</p>}
                                    <label className="profile--label" htmlFor="email">Email:</label>
                                    {editEmail ?
                                        <form onSubmit={submitInfo}>
                                            <input
                                                className="new-item browser-default"
                                                name="email"
                                                type="text"
                                                onChange={editInfo}
                                                value={info.email}
                                                autoFocus
                                            />
                                            <div style={{ position: "absolute" }}>
                                                <Fab style={fabStyle} type="submit"><CheckCircleOutlineIcon /></Fab>
                                                <Fab style={fabStyle} onClick={() => setEditEmail(false)} ><CancelOutlinedIcon /></Fab>
                                            </div>
                                        </form>
                                        :
                                        <p id="email" className="profile--info" onClick={() => setEditEmail(true)}>{email}</p>}
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
