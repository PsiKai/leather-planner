import React, { useState, useContext } from 'react'
import authContext from '../context/AuthContext'
import axios from "axios"

const PasswordField = () => {
    const AuthContext = useContext(authContext)
    const { setAlert, user } = AuthContext
    const [password, setPassword] = useState({})

    const submitPassword = async (e) => {
        e.preventDefault()
        if (password.oldPass && password.newPass) {
            try {
                const res = await axios.patch("/updatePassword", {...password, user})
                setAlert(res.data.msg)
            } catch (error) {
                console.log()
                setAlert(error.response.data.msg)
            }
        } else {
            setAlert("Please enter both password fields")
        }
        setPassword({oldPass: "", newPass: ""})
    }
    
    const editPassword = (e) => {
        const {name, value} = e.target
        setPassword((rest) => {
            return {...rest, [name]: value}
        })
    }

    return (
        <div className="password-reset">
            <label className="profile--label">Update Password</label>
            <form onSubmit={submitPassword}>
                <input
                    className="new-item browser-default"
                    name="oldPass"
                    type="password"
                    onChange={editPassword}
                    value={password.oldPass}
                    placeholder="Old Password"
                />
                <input
                    className="new-item browser-default"
                    name="newPass"
                    type="password"
                    onChange={editPassword}
                    value={password.newPass}
                    placeholder="New Password"
                />
                <button type="submit" class="btn password--submit">Save Password</button>
            </form>
        </div>
    )
}

export default PasswordField
