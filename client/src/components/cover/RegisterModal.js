import React, {useContext, useState, useRef} from 'react';
import AuthContext from "../../context/authentication/AuthContext";

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const RegisterModal = ({ openRegister }) => {
    const authContext = useContext(AuthContext);
    const {register, setAlert} = authContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordTwo: ''
    })
    const {email, password, name, passwordTwo} = user;

    const [showPassword, setShowPassword] = useState(false)
    const passwordInput = useRef()
    const [showPasswordTwo, setShowPasswordTwo] = useState(false)
    const passwordInputTwo = useRef()

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
        if (name.length === 0) {
            validationType("Name is required")
            validated = false
        }
        if (email.length === 0 || !email.includes("@")) {
            validationType("Valid email is required")
            validated = false
        } 
        if (password.length < 6) {
            validationType("Password must be 6 or more characters")
            validated = false
        } 
        if (password !== passwordTwo) {
            validationType("Passwords must match")
            validated = false
        } 
        if (validated) {
            register({name, email, password})
            setUser({
                name: '',
                email: '',
                password: '',
                passwordTwo: ''
            })
            openRegister(false)
        }    
    }

    const closeModal = (e) => {
        console.log(e.target.className);
        if (e.target.classList.contains("modal-backdrop")) {
            openRegister(false)
        }
    }

    const revealPassword = (type) => {
        setShowPassword(!showPassword)
        passwordInput.current.type = type
    }

    const revealPasswordTwo = (type) => {
        setShowPasswordTwo(!showPasswordTwo)
        passwordInputTwo.current.type = type
    }

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div id="registerModal" className="modal">
                <form onSubmit={onSubmit}>
                    <p>Name</p>
                    <input 
                        type="text" 
                        name="name" 
                        value={name} 
                        onChange={onChange}
                        autoComplete="off"
                    />
                    <p>Email</p>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange}
                        autoComplete="off"
                    />
                    <p>Password</p>
                    <div className="password-input">
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={onChange}
                            autoComplete="off"
                            ref={passwordInput}
                        />
                        {showPassword ? 
                            <VisibilityIcon onClick={() => revealPassword("password")}/>
                            : 
                            <VisibilityOffIcon onClick={() => revealPassword("text")}/>}
                    </div>  
                    <p>Confirm Password</p>
                    <div className="password-input">
                        <input 
                            type="password" 
                            name="passwordTwo" 
                            value={passwordTwo} 
                            onChange={onChange}
                            autoComplete="off"
                            ref={passwordInputTwo}
                        />
                        {showPasswordTwo ? 
                            <VisibilityIcon onClick={() => revealPasswordTwo("password")}/>
                            : 
                            <VisibilityOffIcon onClick={() => revealPasswordTwo("text")}/>}
                    </div> 
                    <button type="submit" className="btn">Register</button>
                </form>
            </div>
        </div>
    )
}
    
export default RegisterModal