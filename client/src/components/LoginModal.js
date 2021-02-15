import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";

const LoginModal = () => {

    const authContext = useContext(AuthContext);
    const {login} = authContext;

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const {email, password} = user;

    const onChange = (e) =>
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    const onSubmit = (e) => {
        e.preventDefault();
        if (email !== null && password !== null) {
            login({
                email,
                password
            })
        }
        setUser({
            email: '',
            password: ''
        })
    }
    return (
        <div id="loginModal" className="modal">
            {/* <div className="modal-content"> */}
                <form onSubmit={onSubmit}>
                    <p>Email</p>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                    <p>Password</p>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                    <button type="submit" className="btn">Login</button>
                    {/* <input className="modal-close" /> */}
                </form>
            {/* </div> */}
        </div>
    )
}

export default LoginModal
