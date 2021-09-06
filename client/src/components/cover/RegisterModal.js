import React, {useContext, useState} from 'react';
import AuthContext from "../../context/authentication/AuthContext";

const RegisterModal = () => {
    const authContext = useContext(AuthContext);
    const {register, setAlert} = authContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordTwo: ''
    })

    const {email, password, name, passwordTwo} = user;

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
        }
    
    }
    return (
        <div id="registerModal" className="modal" style={modalStyle}>
            <form onSubmit={onSubmit}>
                <p>Name</p>
                <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={onChange} 
                    // required 
                    autoComplete="off"
                />
                <p>Email</p>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={onChange} 
                    // required 
                    autoComplete="off"
                />
                <p>Password</p>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    // required 
                    autoComplete="off"
                />
                <p>Confirm Password</p>
                <input 
                    type="password" 
                    name="passwordTwo" 
                    value={passwordTwo} 
                    onChange={onChange} 
                    // required 
                    autoComplete="off"
                />
                <button type="submit" className="btn">Register</button>
                {/* <input className="modal-close" /> */}
            </form>
        </div>
    )
}

    const modalStyle = {
        width: "75%",
        height: "75%"
    }
    
export default RegisterModal