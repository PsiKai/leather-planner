import React, { useEffect, useContext, useState } from 'react'
import AuthContext from "../../context/authentication/AuthContext"

import axios from 'axios';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

const EditInfo = () => {
    const authContext = useContext(AuthContext)
    const { user, getUser, setAlert } = authContext
    const { name, email } = user ?? {}

    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [info, setInfo] = useState({ name, email } ?? {})

    useEffect(() => {
        setInfo({ name, email })
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        setInfo({ name, email })
        //eslint-disable-next-line
    }, [user])

    const editInfo = (e) => {
        const { name, value } = e.target
        setInfo((prevInfo) => {
            return { ...prevInfo, [name]: value }
        })
    }

    const submitInfo = async (e) => {
        e.preventDefault()
        const { name, value } = e.target[0]
        try {
            const res = await axios.patch("/user/update", { user, name, value })
            const { data: { msg }, status } = res
            getUser()
            setAlert({ status, msg })
        } catch (error) {
            const { status } = error.response
            setAlert({ status, msg: `Error updating ${name}` })
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
                        <Fab style={fabStyle} type="submit">
                            <CheckCircleOutlineIcon />
                        </Fab>
                        <Fab style={fabStyle} onClick={() => setEditName(false)} aria-label="Cancel">
                            <CancelOutlinedIcon />
                        </Fab>
                    </div>
                </form>
                :
                <p id="username" className="profile--info" onClick={() => setEditName(true)}>
                    {name} <EditIcon aria-label="Edit username"/>
                </p>}
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
                        <Fab style={fabStyle} type="submit">
                            <CheckCircleOutlineIcon />
                        </Fab>
                        <Fab style={fabStyle} onClick={() => setEditEmail(false)} aria-label="Cancel" >
                            <CancelOutlinedIcon />
                        </Fab>
                    </div>
                </form>
                :
                <p id="email" className="profile--info" onClick={() => setEditEmail(true)}>
                    {email} <EditIcon aria-label="Edit email"/>
                </p>}
        </div>
    )
}

export default EditInfo
