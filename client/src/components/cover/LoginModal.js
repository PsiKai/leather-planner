import React, {useContext, useState} from 'react';
import AuthContext from "../../context/authentication/AuthContext";

const LoginModal = ({ openLogin }) => {

    const authContext = useContext(AuthContext);
    const { login, setAlert } = authContext;

    const [user, setUser] = useState({ email: '', password: '' })

    const {email, password} = user;

    const onChange = (e) =>
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    const validationType = (msg) => {
        setAlert({ status: 400, msg })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let validated = true
        if (email.length === 0 || !email.includes("@")) {
            validationType("Valid email is required")
            validated = false
        }
        if (password.length === 0) {
            validationType("Please enter your password")
            validated = false
        }
        if (validated) {
            login({ email, password })
            setUser({ email: '', password: '' })
            openLogin(false)
        }
    }

    const closeModal = (e) => {
        console.log(e.target.className);
        if (e.target.className.includes("modal-backdrop")) {
            openLogin(false)
        }
    }

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div id="loginModal" className="modal">
                <form onSubmit={onSubmit}>
                    <p>Email</p>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                    <p>Password</p>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal
