import React, { useEffect, useContext, useState } from 'react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AuthContext from "../context/AuthContext"
import axios from 'axios';

const EditInfo = () => {
    const authContext = useContext(AuthContext)
    const { user, getUser, setAlert } = authContext
    const { name, email } = user ?? {}

    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [info, setInfo] = useState({ name, email } ?? {})

    useEffect(() => {
        // getUser();
        setInfo({ name, email })
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        setInfo({ name, email })
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
                        <Fab style={fabStyle} onClick={() => setEditName(false)}>
                            <CancelOutlinedIcon />
                        </Fab>
                    </div>
                </form>
                :
                <p id="username" className="profile--info" onClick={() => setEditName(true)}>
                    {name} <EditIcon />
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
                        <Fab style={fabStyle} onClick={() => setEditEmail(false)} >
                            <CancelOutlinedIcon />
                        </Fab>
                    </div>
                </form>
                :
                <p id="email" className="profile--info" onClick={() => setEditEmail(true)}>
                    {email} <EditIcon />
                </p>}
        </div>
    )
}

export default EditInfo
